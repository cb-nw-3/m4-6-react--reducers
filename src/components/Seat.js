import styled from "styled-components";
import React from "react";
import seatSrc from "../assets/seat-available.svg";
import { getSeatNum } from "../helpers";
import { BookingContext } from "./BookingContext";

const ButtonWrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  nackground-color: transparent;
  cursor: pointer;
  position: relative;

  &:focus {
    outline: none;
  }

  &:disabled img {
    filter: grayscale(100%);
  }

  &:enabled:hover span {
    display: inline;
  }
`;

const ToolTip = styled.span`
  position: absolute;
  background: #222;
  z-index: 99;
  top: -20px;
  left: 0;
  padding: 2px;
  color: #fff;
  display: none;
  min-width: 120px;
`;

const Seat = ({ seatId, seats, rowName, seatIndex }) => {
  const {
    state,
    actions: { bookSeat },
  } = React.useContext(BookingContext);

  const seat = seats[seatId];
  return (
    <>
      <ButtonWrapper
        disabled={seat.isBooked}
        onClick={bookSeat.bind(null, {
          seatId: seatId,
          price: seat.price,
          status: seat.isBooked ? "unavailable" : "available",
        })}
      >
        {<img alt="seat" src={seatSrc} />}
        <ToolTip>
          {rowName}, Seat {getSeatNum(seatIndex)} - {seat.price}$
        </ToolTip>
      </ButtonWrapper>
    </>
  );
};

export default Seat;
