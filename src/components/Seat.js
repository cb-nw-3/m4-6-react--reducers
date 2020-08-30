import React from 'react'
import styled from 'styled-components'
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { BookingContext} from './BookingContext'


const Seat = ({seatSrc, isBooked, price, ID}) => {
    const {
        actions: { beginBookingProcess },
        state: { selectedSeatId },
        } = React.useContext(BookingContext);

        console.log(selectedSeatId)
    return (
    <Tippy content={`Seat: ${ID} Price: $${price}`}>
        <Button disabled={isBooked ? true : null} onClick={() => beginBookingProcess(ID)} >
            <Wrapper src={seatSrc} style={{ filter: isBooked ? 'grayscale(100%)' : null }} />
        </Button>
    </Tippy>
    )
}

export default Seat

const Button = styled.button`
    border: none;
`;

const Wrapper = styled.img``;
