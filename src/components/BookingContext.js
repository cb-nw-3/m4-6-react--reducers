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

    case "cancel-booking-process":
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

    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.error,
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

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };

  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  const purchaseTicketFailure = ({ error }) => {
    dispatch({
      type: "purchase-ticket-failure",
      error,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        ...state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
