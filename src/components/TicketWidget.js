import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import {SeatContext} from './SeatContext';
import seatImage from '../assets/seat-available.svg';

const TicketWidget = () => {
  //used values from Context
  const {state: { hasLoaded,
                seats,
                numOfRows,
                seatsPerRow },
  } = React.useContext(SeatContext);

  console.log(hasLoaded);
  console.log(seatsPerRow);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if(hasLoaded === false){
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Rendering the seats */}
                  <Seat src={seatImage} alt='seat-icon'/>
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

const Seat = styled.img`
  width: 50px;
  height: 50px;
`

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
