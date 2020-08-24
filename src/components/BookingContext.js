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
        seatId,
        seatPrice,
      }),
    [dispatch]
  );

  const bookingProcessSuccess = (data) => {
    dispatch();
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
