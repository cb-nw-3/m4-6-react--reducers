import styled from "styled-components";
import React from "react";
import seatSrc from "../assets/seat-available.svg";
import { range } from "../utils";
import { getRowName, getSeatNum } from "../helpers";

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

  &:hover span {
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
  const seat = seats[seatId];
  return (
    <>
      <ButtonWrapper disabled={seat.isBooked}>
        {<img alt="seat" src={seatSrc} />}
        <ToolTip>
          {rowName}, Seat {getSeatNum(seatIndex)} - {seat.price}$
        </ToolTip>
      </ButtonWrapper>
    </>
  );
};

export default Seat;
