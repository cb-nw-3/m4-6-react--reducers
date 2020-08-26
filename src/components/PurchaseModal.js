import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import { SeatContext } from './SeatContext';
import { BookingContext} from './BookingContext';

const PurchaseModal = () => {
    //Subscribing to the contexts
    const {
        status,
        error,
        selectedSeatId,
        price,
    } = React.useContext(BookingContext);
    
    const {
        actions: {markSeatAsPurchased },
    } = React.useContext(SeatContext);

    return (
        <Dialog
            open={selectedSeatId !== null}
        >
        test
        </Dialog>
    )
}

export default PurchaseModal;