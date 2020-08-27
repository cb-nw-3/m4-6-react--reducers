import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "begin-booking-process": {
            return {
                ...state,
                status: "seat-selected"
            };
        }
        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const selectSeatForPurhcase = (data) => {
        dispatch({
            type: "begin-booking-process",
            ...data,
        });
    };

    return (
        <BookingContext.Provider
            value={{
                state,
                actions: {
                    selectSeatForPurhcase,
                },
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};