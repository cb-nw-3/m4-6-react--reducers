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
        status: "started",
        error: null,
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
        error: null,
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information",
      };
    case "purchase-ticket-success":
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    case "cancel-booking-process":
      return {
        ...state,
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    default:
      throw new Error(`Action non reconnue ${action.type}`);
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = React.useCallback(
    ({ seatId, seatPrice }) =>
      dispatch({
        type: "begin-booking-process",
        selectedSeatId: seatId,
        price: seatPrice,
      }),
    [dispatch]
  );
  const purchaseTicketRequest = React.useCallback(
    () =>
      dispatch({
        type: "purchase-ticket-request",
      }),
    [dispatch]
  );
  const purchaseTicketFailure = React.useCallback(
    ({ errorMessage }) =>
      dispatch({
        type: "purchase-ticket-failure",
        errorMessage,
      }),
    [dispatch]
  );
  const purchaseTicketSuccess = React.useCallback(
    () =>
      dispatch({
        type: "purchase-ticket-success",
      }),
    [dispatch]
  );
  const cancelBookingProcess = React.useCallback(
    () =>
      dispatch({
        type: "purchase-ticket-success",
      }),
    [dispatch]
  );

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
          cancelBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
