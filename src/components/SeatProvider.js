import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "receive-seat-info-from-server": {
      const results = {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
      console.log("the results are stored as:", results);
      return results;
    }

    case "mark-seat-as-purchased": {
      const results = {
        ...state,
        seats: {
          ...state.seats,
          [action.seatId]: {
            ...state.seats[action.seatId],
            isBooked: true,
          },
        },
      };
      console.log("the results are stored as:", results);
      return results;
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function receiveSeatInfoFromServer(data) {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  }

  const markedSeatAsPurchased = React.useCallback(
    (seatId) =>
      dispatch({
        type: "mark-seat-as-purchased",
        seatId,
      }),
    [dispatch]
  );

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markedSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};

export default SeatProvider;
