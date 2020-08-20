import React from 'react';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import { SeatContext } from './SeatContext';
import Seat from './Seat';
import seatImage from '../assets/seat-available.svg';

import Tippy from '@tippyjs/react';

const TicketWidget = () => {
  const {
    state: {
      hasLoaded,
      seats,
      numOfRows,
      seatsPerRow
    }
  } = React.useContext(SeatContext);

  if (!hasLoaded) {
    return (
      <Circular>
        <CircularProgress />
      </Circular>
    )
  }

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
              console.log('inside', seats[seatId].price)
              console.log('seatId', seatId)
              return (
                <Tippy style={{ background: 'black' }} content={`${seatId} - $${seats[seatId].price}`}>
                  <SeatWrapper key={seatId}>
                    {

                      <img src={seatImage}
                        style={{
                          filter: (seats[seatId].isBooked) ? 'grayscale(0%)' : 'grayscale(100%)',
                        }} />
                    }
                  </SeatWrapper>
                </Tippy>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
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
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const Circular = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default TicketWidget;
