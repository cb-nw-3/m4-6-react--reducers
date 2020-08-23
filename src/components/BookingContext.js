import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log("state from booking reducer", state);
  console.log("action from booking reducer", action);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.payload.seatId,
        price: action.payload.price,
      };
    case "cancel-booking-process":
      return {
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    default:
      throw new Error("Unrecognized action");
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (seatId, price) => {
    dispatch({ type: "begin-booking-process", payload: { seatId, price } });
  };

  const cancelBookingProcess = (seatId) => {
    dispatch({ type: "cancel-booking-process", seatId });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
