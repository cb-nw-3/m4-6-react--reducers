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
    case "begin-booking-process": {
      const newState = { ...state };
      newState.status = action.status;
      newState.selectedSeatId = action.seatId;
      newState.price = action.price;
      return newState;
    }
    case "handle-close": {
      const newState = { ...state };
      newState.status = "idle";
      newState.selectedSeatId = null;
      newState.price = null;
      return newState;
    }
    case "handle-status": {
      const newState = { ...state };
      newState.status = "idle";
      return newState;
    }
    case "handle-purchase": {
      const newState = { ...state };
      newState.status = "purchased";
      return newState;
    }
    default: {
      return state;
    }
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const bookSeat = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const handleClose = (data) => {
    dispatch({
      type: "handle-close",
      ...data,
    });
  };

  const handleStatus = (data) => {
    dispatch({
      type: "handle-status",
      ...data,
    });
  };

  const handlePurchase = (data) => {
    dispatch({
      type: "handle-purchase",
      ...data,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          bookSeat,
          handleClose,
          handleStatus,
          handlePurchase,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
