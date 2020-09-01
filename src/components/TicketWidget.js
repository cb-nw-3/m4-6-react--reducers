import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { SeatContext } from './SeatContext'
import { getRowName, getSeatNum } from '../helpers';
import { range } from '../utils';
import seatSrc from "../assets/seat-available.svg";
import PurchaseModal from './PurchaseModal';

import { ModalContext } from './ModalContext';

const TicketWidget = () => {

  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
    dispatch
  } = React.useContext(SeatContext);

  const {
    modalSeat,
    setModalSeat
  } = React.useContext(ModalContext);

  // is it that it's not properly initialized, or am I just accessing it incorrectly?
  // It wasn't properly initialized. *facepalm*

  // DONE: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  // SeatButton needs to call PurchaseModal, right. But this generates a hook error.
  // could this be why? Can I not... call it that way? But then... how do I call it?

  // we're trying to use PurchaseModal as a function, but it's a component.
  // this is obviously not ideal.

  // track the state of if there's a selected seat
  // if there is, render the modal
  // if not, render nothing.

  const Seat = (props) => {

    const rowArray = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let rowLetter = rowArray[props.rowIndex];
    let seatNum = props.seatIndex + 1;
    let tippyContent = `Row ${rowLetter}, Seat ${seatNum} - $${props.price}`;
    if (props.status === 'available') {
      return (
        <Tippy content={tippyContent}>
          <SeatButton onClick={() => {
            setModalSeat({
              ...props,
              "rowLetter": rowLetter,
              "seatNum": seatNum,
            })
          }}><img alt="seat for booking" src={seatSrc} /></SeatButton >
        </Tippy >
      )
    } else {
      return <img alt="sold seat for booking" style={{
        filter: 'grayscale(100%)'
      }} src={seatSrc} />
    }
  }

  if (hasLoaded === false) {
    return (
      <LoadingWrapper>
        < CircularProgress />
      </LoadingWrapper>
    )
  } else {
    return (
      <Wrapper>
        {range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const seat = seats[seatId];

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      price={seat.price}
                      status={seat.isBooked ? "unavailable" : "available"}
                    />
                  </SeatWrapper>
                )
              })}
            </Row>
          );
        })
        }
        {modalSeat !== undefined &&
          <PurchaseModal open={true} />
        }
      </Wrapper >
    );
  }
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-top: 100px;
  width: min-content;
`;

const LoadingWrapper = styled(Wrapper)`
  background: #222;
  border: none;
`

const Row = styled.div`
  display: flex;
  position: relative;

  // &:not(:last-of-type) {
  //   border-bottom: 1px solid #ddd;
  // }
`;

const RowLabel = styled.div`
  font-weight: bold;
  position: absolute;
  margin-top: 14px;
  margin-left: -80px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const SeatButton = styled.button`
  border: none;
  padding: 0;
`;

export default TicketWidget;
