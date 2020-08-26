import React from 'react';
import styled from 'styled-components'

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import seatImage from '../assets/seat-available.svg';

const Seat = (props) => {
    return(

        <SeatInfo
        content={`Row: ${String.fromCharCode(props.rowIndex + 65)}, Seat: ${props.seatIndex + 1}, Price: ${props.price}$`}
        arrow
        >
            <SeatWrapper 
            key={props.seatId}
            disabled={props.status}
            >
            <SeatImage 
                src={seatImage}
                alt={`Seat ${props.seatId}`}
                rowIndex={props.rowIndex}
                seatIndex={props.seatIndex}
            />
            </SeatWrapper>
        </SeatInfo>
    )
}


const SeatInfo = styled(Tippy)`
`

const SeatImage  = styled.img`
  width: 50px;
  height: 50px;
`;

const SeatWrapper = styled.button`
  padding: 5px;
  display: inline-block;
  border: none;
  margin: 0;
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    filter: grayscale(100%);
  }
`;

export default Seat;