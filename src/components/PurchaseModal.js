import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

import { BookingContext } from './BookingContext';

// const PurchaseModal = () => {
//     const {
//         status,
//         actions: { selectSeatForPurchase }
//     } = React.useContext(BookingContext);

//     console.log("state", status);

//     return (
//         <div>what</div>
//     );

// }

// ok. for some reason, this generates an invalid hook call.
// Why? Whhhhhhhhhy

const PurchaseModal = (props) => {
    // const {
    //     state: { status },
    //     actions: { selectSeatForPurchase }
    // } = React.useContext(BookingContext);
    return <Dialog open={props.open}>ERROR</Dialog>
}

export default PurchaseModal;