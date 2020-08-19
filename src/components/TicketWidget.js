import React from 'react';
import styled from 'styled-components/macro';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';

import { SeatContext } from './SeatContext';

import seatImage from '../assets/seat-available.svg';

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

              return (
                <SeatWrapper key={seatId}>
                  {
                    <img src={seatImage} />
                  }
                </SeatWrapper>
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
