import React from "react";

export const SeatContext = React.createContext(null);

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
        seats: action.seats,
        seatsPerRow: action.seatsPerRow,
        numOfRows: action.numOfRows,
        hasLoaded: true,
      };
    case "LOADING":
      return {
        ...state,
        hasLoaded: false,
      };

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

  const setLoading = () => {
    dispatch({
      type: "LOADING",
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          setLoading,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
