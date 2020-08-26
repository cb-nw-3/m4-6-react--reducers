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
      // TODO
      const newState = { ...state };
      newState.status = action.status;
      newState.selectedSeatId = action.seatId;
      newState.price = action.price;
      console.log(newState);
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

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          bookSeat,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
