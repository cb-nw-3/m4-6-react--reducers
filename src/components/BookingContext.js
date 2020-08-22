import React from "react";

export const BookingContext = React.createContext(null);

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  //console.log(action);
  switch (action.type) {
    case "begin-booking-process": {
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "purchase-ticket-request": {
      return {
        ...state,
        status: "awaiting-response",
      };
    }
    case "purchase-ticket-failure": {
      return {
        ...state,
        status: "error",
        message: action.message,
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
    case "cancel-booking-process": {
      return {
        status: "idle",
        selectedSeatId: null,
        price: null,
      };
    }

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //console.log(state);

  const startBookingProcess = (data) => {
    //console.log("started booking process");
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = () => {
    //console.log("cancel booking process");
    dispatch({
      type: "cancel-booking-process",
    });
  };
  const purchaseTicketFailure = (data) => {
    //console.log("purchase ticket failure");
    dispatch({
      type: "purchase-ticket-failure",
      ...data,
    });
  };
  const purchaseTicketSuccess = () => {
    //console.log("purchase ticket success");
    dispatch({
      type: "purchase-ticket-success",
    });
  };
  const requestPurchaseTicket = () => {
    //console.log("request purchase ticket");
    dispatch({
      type: "purchase-ticket-request",
    });
  };
  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          startBookingProcess,
          cancelBookingProcess,
          requestPurchaseTicket,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
