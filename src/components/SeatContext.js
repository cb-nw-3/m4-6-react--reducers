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
    case "recieve-seat-info-from-server": {
      console.log("reducer triggered");
      console.log(action);
      console.log(state);

      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    }
    default: {
      console.log("error");
      console.log(action);

      //   // If no action matches, this must be a mistake
      //   throw new Error("whoopsie");
    }
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const recieveSeatInfoFromServer = (data) => {
    console.log("recieveSeatInfoFromServer");
    console.log(data);

    dispatch({
      type: "recieve-seat-info-from-server",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{ state, actions: { recieveSeatInfoFromServer } }}
    >
      {children}
    </SeatContext.Provider>
  );
};
