import React, { createContext, useReducer } from "react";

export const SeatContext = createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return { ...state, key1: false };
    default:
      return state;
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };
  return (
    <SeatContext.Provider
      value={{
        state,
        actions: { receiveSeatInfoFromServer },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
