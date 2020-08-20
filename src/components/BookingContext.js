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
    default: {
      throw new Error(`Unrecognized action: ${action.type}`);
    }
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

  return (
    <BookingContext.Provider
      value={{
        ...state,
        actions: {
          beginBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};