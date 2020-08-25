import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import seat from '../assets/seat-available.svg'
import Seat from './Seat'

import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import { SeatContext } from './SeatContext'
import { Dialog } from '@material-ui/core';

const TicketWidget = () => {
  const [open, setOpen] = React.useState(false)
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow},
  } = React.useContext(SeatContext)
  // TODO: use values from Context
  // console.log(seats) // isBooked true / false
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (!hasLoaded) {
    return <CircularProgress />
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
              

              // if seats isBooked = true { {style={{filter: 'grayscale(100%)'}}} }
              // console.log(seats[seatId].price)
              return (
                <SeatWrapper key={seatId}>
                  {<Seat seatSrc={seat} ID={seatId} isBooked={seats[seatId].isBooked} price={seats[seatId].price} />}
                </SeatWrapper>
              );
            })}
            
          </Row>
          
        ); 

      })}
      <Dialog open={false}>
        
        Price: {}
      </Dialog>
      
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


export default TicketWidget;
