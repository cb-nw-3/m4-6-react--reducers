// Libraries
import React from 'react';
import styled from 'styled-components';
import Tippy from '@tippyjs/react';
// Assets
import SeatImage from '../assets/seat-available.svg';
// Helpers
import { getRowName, getSeatNum, encodeSeatId } from '../helpers';
// Styles
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';

export const Seat = ({ rowIndex, seatIndex, price, status }) => {
    const rowName = getRowName(rowIndex);
    const seatNum = getSeatNum(seatIndex);
    const seatId = encodeSeatId(rowIndex, seatIndex);

    return (
        <>
            <Tippy
                key={seatId}
                content={`Row ${rowName}, Seat ${seatNum} – $${price}`}
                placement="top"
                animation="scale-subtle"
                arrow={true}
                duration={300}
                delay={[100, 0]}
            >
                <SeatWrapper disabled={status === 'unavailable'}>
                    <img src={SeatImage} alt={`seat-${seatId}`} />
                </SeatWrapper>
            </Tippy>
        </>
    );
};

const SeatWrapper = styled.button`
    padding: 5px;
    border: none;

    &:disabled {
        filter: grayscale(100%);
    }
    &:hover:not([disabled]) {
        cursor: pointer;
    }
`;

export default Seat;
