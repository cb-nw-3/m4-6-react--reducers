import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { SeatContext } from './SeatContext';
import { BookingContext} from './BookingContext';

import ModalTable from './ModalTable';
import ModalPayments from './ModalPayment';

const PurchaseModal = () => {
    //Subscribing to the contexts
    const {
        status,
        error,
        selectedSeatId,
        price,
        actions: {
            cancelBookingProcess,
        }
    } = React.useContext(BookingContext);

    return (
        <Dialog
            open={selectedSeatId !== null}
            onClose={cancelBookingProcess}
        >
            <h2>Purchase Ticket</h2>
            <p>You're purchasing <strong>1</strong> ticket for the price of {`${price}`}</p>
            <ModalTable
                price={price}
                selectedSeatId={selectedSeatId}
            />
            <ModalPayments />
        </Dialog>
    )}

export default PurchaseModal;