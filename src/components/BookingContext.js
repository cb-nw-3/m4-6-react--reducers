import React from 'react';

export const BookingContext = React.createContext();

const initialState = {
    status: "idle",
    error: null,
    selectedSeatId: null,
    price: null,
};

function reducer(state, action) {
    switch (action.tyoe) {
        case 'begin-booking-process': {
            return {
                ...state,
                status: 'seat-selected',
                selectedSeatID: action.seatId,
                price: action.price,
            }
        }
        case 'awaiting-booking-process': {
            return {
                ...state,
                status: 'awaiting-response',
                error: null,
            }
        }
        case 'fail-booking-process': {
            return {
                ...state,
                status: 'error',
                error: action.message,
            }
        }
        case 'purchase-success-process': {
            return {
                ...state,
                status: 'purchased',
                selectedSeatID: action.seatId,
                price: action.price,
                error: null,
            }
        }
        default:
            throw new Error(`Error: ${action.type}`);
    }
}

export const BookingProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const beginBookingProcess = ({ seatId, price }) => {
        dispatch({
            type: 'begin-booking-process',
            seatId,
            price
        })
    };
    const awaitingBookingProcess = () => {
        dispatch({
            type: 'awaiting-response',
        })
    };
    const failBookingProcess = ({ message }) => {
        dispatch({
            type: 'fail-booking-process',
            message,
        })
    };
    const purchaseSuccessProcess = ({ seatId, price }) => {
        dispatch({
            type: 'purchase-success-process',
            seatId,
            price
        })
    };

    return (
        <BookingContext.Provider
            value={{
                ...state,
                actions: {
                    beginBookingProcess,
                    awaitingBookingProcess,
                    failBookingProcess,
                    purchaseSuccessProcess,
                }
            }}
        >
            {children}
        </BookingContext.Provider>
    )
};