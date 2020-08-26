import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    case "seat-marked-as-booked":
      return {
        // grab all the old state
        ...state,
        // in seats array
        seats: {
          // grab all the seats
          ...state.seats,
          // change specific seat
          [action.seatId]: {
            // grab all data from said seat
            ...state.seats[action.seatId],
            // change booked property
            isBooked: true,
          },
        },
      };
    default:
      throw new Error(`Action non reconnue ${action.type}`);
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
  const markSeatAsBooked = (seatId) => {
    dispatch({
      type: "seat-marked-as-booked",
      seatId,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsBooked,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
