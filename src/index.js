import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { SeatProvider } from './components/SeatContext';
import { BookingProvider } from './components/BookingContext';
import { ModalProvider } from './components/ModalContext';

const rootElement = document.getElementById('root');

ReactDOM.render(
    <BookingProvider>
        <SeatProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </SeatProvider>
    </BookingProvider>,
    rootElement);
