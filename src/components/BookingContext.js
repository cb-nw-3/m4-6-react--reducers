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
            console.log(action)
            return {    
                ...state,
                selectedSeatId: action.payload,
                price: action.price,
            }
        }

        default:
            throw new Error(`Unrecognized action: ${action.type}`);
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = (payload, price) => {
        console.log(payload, price)
        dispatch({
            type: "begin-booking-process",
            payload,
            price
        })
    }
    console.log(state)  
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