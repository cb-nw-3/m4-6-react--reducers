import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  //console.log(action);
  switch (action.type) {
    case "receive-seat-info-from-server": {
      //console.log(action);
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        seatsPerRow: action.seatsPerRow,
        numOfRows: action.numOfRows,
      };
    }
    case "mark-seat-as-purchased": {
      // console.log(action);
      // console.log(state.seats);
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
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
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
      seatId: data.seatId,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: { receiveSeatInfoFromServer, markSeatAsPurchased },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
