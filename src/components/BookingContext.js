import React from 'react'

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    console.log(state)
    

    switch (action.type) {
        case 'begin-booking-process': {
            console.log('hello')
            return {
                ...state,
                selectedSeatId: action.payload,
            }
        }

        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = (data) => {
        console.log(data)
        dispatch({
            type: "begin-booking-process",
            ...data,
            payload: data,
        })
    }

    return (
        <BookingContext.Provider
        value={{
            state,
            actions: {
                beginBookingProcess,
            },
        }}
        >
            {children}
        </BookingContext.Provider>
    );
};