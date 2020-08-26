import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import {SeatContext} from './SeatContext';
import Seat from './Seat';


const TicketWidget = () => {
  //used values from Context
  const {state: { hasLoaded,
                seats,
                numOfRows,
                seatsPerRow },
  } = React.useContext(SeatContext);

  if(hasLoaded === false){
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <SeatMap>
        {range(numOfRows).map(rowIndex => {
        const rowName = getRowName(rowIndex);

        return (
          <RowWrapper>
            <RowLabel>Row {rowName}</RowLabel>
            <Row key={rowIndex}>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                return (
                  <Seat
                    seatId={seatId}
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    price={seats[`${seatId}`].price}
                    status={seats[`${seatId}`].isBooked}
                  />
                );
              })}
            </Row>
          </RowWrapper>
        );
      })}
      </SeatMap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  width:  100%;
  display: flex;
  justify-content: center;
  align-items: center
`;

const SeatMap = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  width: 552pt;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
`

const Row = styled.div`
  position:relative;
  right: 30px;
  align-items:center;
  display: flex;
  position: relative;
  flex-direction: row;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  position:relative;
  right: 60px;
  font-weight: bold;
`;

export default TicketWidget;
