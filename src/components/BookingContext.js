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
<<<<<<< HEAD
    case "cance-booking-process":
=======

    case "cancel-booking-process":
>>>>>>> cb956e71ba9d0bb614344f5568862ced20d2d985
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

<<<<<<< HEAD
=======
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.error,
      };

>>>>>>> cb956e71ba9d0bb614344f5568862ced20d2d985
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
<<<<<<< HEAD
=======

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

>>>>>>> cb956e71ba9d0bb614344f5568862ced20d2d985
  return (
    <BookingContext.Provider
      value={{
        ...state,
<<<<<<< HEAD
        actions: { beginBookingProcess },
=======
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure,
        },
>>>>>>> cb956e71ba9d0bb614344f5568862ced20d2d985
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
