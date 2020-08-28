import React from "react";

export const BookingContext = React.createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
        row: action.row,
        seat: action.seat,
      };
    case "confirm-booking-process":
      return {
        ...state,
        status: "successfully purchased ticket",
        selectedSeatId: action.seatId,
      };
    case "error-booking-process":
      return {
        ...state,
        error: action.errorMessage,
      };
    case "cancel-booking-process":
      return {
        ...state,
        selectedSeatId: null,
        status: "idle",
      };
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
        selectedSeatId: action.seatId,
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        errorMessage: action.errorMessage,
      };
    case "purchase-ticket-success":
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };
  const confirmBookingProcess = (data, seatId) => {
    dispatch({
      type: "confirm-booking-process",
      ...data,
      seatId,
    });
  };
  const errorBookingProcess = (errorMessage) => {
    dispatch({
      type: "error-booking-process",
      errorMessage,
    });
  };
  const priceBookingProcess = (data, price) => {
    dispatch({
      type: "price-booking-process",
      ...data,
      price,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = (seatId) => {
    dispatch({
      type: "purchase-ticket-request",
      seatId,
    });
  };
  const purchaseTickeFailure = (message) => {
    dispatch({
      type: "purchase-ticket-failure",
      message,
    });
  };

  const purchaseTicketSuccess = (data) => {
    dispatch({
      type: "purchase-ticket-success",
      ...data,
    });
  };

  console.log("state in booking context: ", state);

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          priceBookingProcess,
          errorBookingProcess,
          confirmBookingProcess,
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTickeFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
