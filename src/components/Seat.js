import React from 'react';
import styled from 'styled-components/macro';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import { SeatContext } from './SeatContext';
import seatImage from '../assets/seat-available.svg';

import Tippy from '@tippyjs/react';

const Seat = (width, height) => {
    const {
        state: {
            seats,
            numOfRows,
            seatsPerRow
        }
    } = React.useContext(SeatContext);

    return (
        <Wrapper>
            {range(numOfRows).map(rowIndex => {
                const rowName = getRowName(rowIndex);
                console.log(rowIndex)
                return (
                    <Row key={rowIndex}>
                        <RowLabel>Row {rowName}</RowLabel>
                        {range(seatsPerRow).map(seatIndex => {
                            const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                            return (
                                <Tippy content={(seats[seatId].isBooked) ? <Span>{seatId} - ${seats[seatId].price}</Span> : <Span>Unavailable</Span>}>
                                    <SeatWrapper key={seatId}>
                                        <Button>
                                            <img src={seatImage}
                                                style={{
                                                    filter: (seats[seatId].isBooked) ? 'grayscale(0%)' : 'grayscale(100%)',
                                                }} />
                                        </Button>
                                    </SeatWrapper>
                                </Tippy>
                            );
                        })}
                    </Row>
                );
            })}
        </Wrapper >
    );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  color: black;
  padding-right: 10px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const Button = styled.button`
    border: none;
    padding: 0;
    outline: none;
`;

const Span = styled.span`
    background: rgba(46, 49, 49, 1);
    padding: 5px;
    border-radius: 3px;
`;

export default Seat;
