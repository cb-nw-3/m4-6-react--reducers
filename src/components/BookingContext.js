import React from "react";

export const BookingContext = React.createContext(null);

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
      console.log(action);
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    }
    case "cancel-booking-process": {
      console.log(action);
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

  const startBookingProcess = (data) => {
    console.log("started booking process");
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = (data) => {
    console.log("started booking process");
    dispatch({
      type: "cancel-booking-process",
    });
  };
  return (
    <BookingContext.Provider
      value={{ state, actions: { startBookingProcess, cancelBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
