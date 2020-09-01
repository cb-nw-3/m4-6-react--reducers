import React from 'react';

export const ModalContext = React.createContext();

const initialState = undefined;

export const ModalProvider = ({ children }) => {
    const [modalSeat, setModalSeat] = React.useState(initialState);

    return (
        <ModalContext.Provider
            value={{
                modalSeat,
                setModalSeat
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};