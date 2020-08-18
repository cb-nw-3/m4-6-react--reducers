import React from 'react';

export const SeatContext = React.createContext();

const initialState = {
    hasLoaded: false,
    seats: null,
    numOfRows: 0,
    seatsPerRow: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case '':
            return {}
        default:
            return state
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
