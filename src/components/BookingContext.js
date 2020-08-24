import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
    case "cance-booking-process":
      return {
        ...state,
        status: "idle",
        selectedSeatId: null,
        price: null,
      };
    case "purchase-ticket-request":
      return {
        ...state,
        error: null,
        status: "awaiting-response",
      };
    case "purchase-ticket-success":
      return {
        ...state,
        status: "purchased",
        selectedSeatId: null,
        price: null,
        error: null,
      };

    default:
      return state;
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        actions: { beginBookingProcess },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
