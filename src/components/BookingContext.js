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
        price: action.seatPrice,
        selectedSeatId: action.seatId,
      };
    }
    case "cancel-booking-process": {
      return {
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    }
    default:
      throw new Error("Unrecognised Action");
  }
}

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log("state Booking", state);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: { beginBookingProcess, cancelBookingProcess },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
