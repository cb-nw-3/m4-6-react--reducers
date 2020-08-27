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
    default:
      throw new Error("Unrecognized action: ${action.type}");
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
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
