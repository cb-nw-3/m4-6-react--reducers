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
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.payload.seatId,
        price: action.payload.price,
      };
    case "cancel-booking-process":
      return {
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    case "purchase-ticket-request":
      return { ...state, status: "awaiting-response" };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.error,
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
      throw new Error("Unrecognized action");
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (seatId, price) => {
    dispatch({ type: "begin-booking-process", payload: { seatId, price } });
  };

  const cancelBookingProcess = (seatId) => {
    dispatch({ type: "cancel-booking-process", seatId });
  };

  const purchaseTicketRequest = () => {
    dispatch({ type: "purchase-ticket-request" });
  };

  const purchaseTicketFailure = (error) => {
    dispatch({ type: "purchase-ticket-failure", error });
  };

  const purchaseTicketSuccess = (data) => {
    dispatch({ type: "purchase-ticket-success" }, data);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
