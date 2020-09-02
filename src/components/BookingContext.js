import React from "react";

export const BookingContext = React.createContext(null);

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log("state from reducer", state);
  console.log("action from reducer", action);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.selectedSeatId,
        price: action.price,
      };
    case "cancel-booking-process":
      return {
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null,
      };
    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
      };
    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information",
      };
    case "purchase-ticket-success":
      return {
        status: "purchased",
        error: null,
        selectedSeatId: null,
        price: null,
      };

    default:
      throw new Error("Unrecognized action");
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };
  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = (data) => {
    dispatch({
      type: "purchase-ticket-request",
      ...data,
    });
  };
  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };
  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
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
export default BookingProvider;
