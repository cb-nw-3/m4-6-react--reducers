import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { SeatContext } from './SeatContext'
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import seatSrc from "../assets/seat-available.svg";

const TicketWidget = () => {

  const { state, dispatch } = React.useContext(SeatContext);

  console.log(state);

  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  const Seat = () => {
    return <img alt="seat for booking" src={seatSrc} />
  }

  return (
    <Wrapper>
      {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            {/* <RowLabel>Row {rowName}</RowLabel> */}
            {range(seatsPerRow).map(seatIndex => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              return (
                <SeatWrapper key={seatId}>
                  <Seat />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

// GlobalStyles forces body to be 100wh
// I don't really want that. But... eh.

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  // &:not(:last-of-type) {
  //   border-bottom: 1px solid #ddd;
  // }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
