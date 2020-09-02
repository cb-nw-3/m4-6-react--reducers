import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  console.log("Seat context state", state);
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        numOfRows: action.numOfRows,
        seats: action.seats,
        seatsPerRow: action.seatsPerRow,
        hasLoaded: true,
      };
    case "mark-seat-as-purchased":
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          },
        },
      };
    default:
      throw new Error("Unrecognized action");
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };
  const markSeatAsPurchased = (data) => {
    dispatch({
      type: "mark-seat-as-purchased",
      ...data,
    });
  };
  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
