import React from 'react';

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case "receive-seat-info-from-server": {
            return {
                ...state,
                hasLoaded: true,
                seats: action.seats,
                numOfRows: action.numOfRows,
                seatsPerRow: action.seatsPerRow,
            };
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const SeatProvider = ({ children }) => {

    console.log("SeatProvider initializing...")

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const receiveSeatInfoFromServer = (data) => {
        dispatch({
            type: "receive-seat-info-from-server",
            ...data,
        });
    };

    console.log("SeatProvider initialized: ", state);

    // ok. I tried to deconstruct state by using ellipsis.
    // this was clearly the wrong thing to do.

    // that kind of makes sense. We deconstruct it above, because
    // we're trying to update the state, so we need to copy in everything

    // here, we're trying to export the whole chimichanga.
    // no need to deconstruct; in fact, that would make it very weird.

    return (
        <SeatContext.Provider
            value={{
                state,
                actions: {
                    receiveSeatInfoFromServer,
                },
            }}
        >
            {children}
        </SeatContext.Provider>
    );
};