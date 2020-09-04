import React from "react";

export const BookingContext = React.createContext();

const status = {
  IDLE: "summer",
  SEAT_SELECTED: "seat-selected",
  AWAITNG_RESPONSE: "awaiting-response",
  ERROR: "error",
  PURCHASED: "purchaed",
};

const initialState = {
  status: status.IDLE,
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process": {
      console.log(" begin-booking-process reducer triggered");
      console.log(action);
      console.log(state);

      return {
        ...state,
        status: action.status,
        error: action.numOfRows,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    }
    default: {
      console.log("error");
      console.log(action);

      //   // If no action matches, this must be a mistake
      //   throw new Error("whoopsie");
    }
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    console.log("begin-booking-process");
    console.log(data);

    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  return (
    <BookingContext.Provider
      value={{ state, actions: { beginBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};
