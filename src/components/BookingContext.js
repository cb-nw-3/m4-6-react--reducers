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

  return (
    <BookingContext.Provider
      value={{
        ...state,
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
