import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
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
        price: null,
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
        selectedSeatId: null,
        price: null,
        error: null,
      };
    }
    default:
      throw new Error("Unrecognized action: ${action.type}");
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = ({ seatId, price }) => {
    dispatch({
      type: "begin-booking-process",
      seatId,
      price,
    });
  };

  const cancelBookingProcess = (data) => {
    dispatch({
      type: "cancel-booking-process",
    });
  };
  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };
  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
// - The initial looking-at-the-seats initial status

// - Looking at the purchase modal, after clicking on a seat

// - Waiting for the response, after submitting the credit card info
// (the 1 second while the button has a spinner in it)

// - The error status, when the credit card info is incomplete

// - The "success" status, after completing a purchase, with the happy
// green banner showing.
