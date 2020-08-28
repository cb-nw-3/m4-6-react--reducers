import React from "react";
import styled from "styled-components";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";
import { BookingContext } from "./BookingContext";
import PurchaseModal from "./PurchaseModal";
import { getRowName, getSeatNum, encodeSeatId } from "../helpers";

const Seat = ({ isBooked, price, rowIndex, seatIndex }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(seatIndex);

  const seatId = encodeSeatId(rowIndex, seatIndex);

  const handleClick = () => {
    beginBookingProcess({ rowName, seatNum, seatId, price });
  };

  return (
    <Tippy content={`Seat: ${rowName}-${seatNum}, Cost: $${price}`}>
      <Wrapper onClick={handleClick} disabled={isBooked}>
        <img src={seatSrc} />
      </Wrapper>
    </Tippy>
  );
};

const Wrapper = styled.button`
  display: ${(props) => props.display || "block"};
  border: none;
  background: transparent;

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;
