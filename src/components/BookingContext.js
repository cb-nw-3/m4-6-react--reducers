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
  return (
    <BookingContext.Provider
      value={{ state, actions: { startBookingProcess } }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
