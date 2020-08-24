import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  //   console.log(action);
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      return {
        ...state,
        status: "idle",
        selectedSeatId: null,
        price: null,
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
        error: null,
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        status: "error",
        error: "Please provide credit card info",
      };
    }
    case "purchase-ticket-success": {
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    case "dismiss-snackbar": {
      return {
        ...state,
        status: "idle",
      };
    }
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = ({ seatId, price }) => {
    console.log(seatId, price);

    dispatch({
      type: "begin-booking-process",
      seatId,
      price,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({ type: "cancel-booking-process" });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseTicketFailure = ({ message }) => {
    dispatch({
      type: "purchase-ticket-failure",
      message,
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };
  const dismissSnackbar = () => {
    dispatch({
      type: "dismiss-snackbar",
    });
  };
  return (
    <BookingContext.Provider
      value={{
        ...state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
          dismissSnackbar,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
