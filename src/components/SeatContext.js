import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  //   console.log(state, action);
  switch (action.type) {
    case "receive-seat-info-from-server": {
      console.log("these are my actions", action);
      const results = {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
      // console.log(results);
      // console.log("new state is:", results);
      return results;
    }
    default:
      throw new Error(`Unrecognized error: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  //   const receiveSeatInfoFromServer = (data) => {
  //     console.log(data);
  //     dispatch({
  //       type: "receive-seat-info-from-server",
  //       ...data,
  //     });
  //   };

  const receiveSeatInfoFromServer = (data) => {
    console.log("retrieved this data:", data);
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };
  return (
    <SeatContext.Provider
      value={{
        ...state,
        actions: {
          receiveSeatInfoFromServer,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
