import React from "react";

export const BookingContext = React.createContext(null);

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log("state from reducer", state);
  console.log("action from reducer", action);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.selectedSeatId,
        price: action.price,
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
  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };
  const cancelBookingProcess = (data) => {
    dispatch({
      type: "cancel-booking-process",
      ...data,
    });
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

export default BookingProvider;
