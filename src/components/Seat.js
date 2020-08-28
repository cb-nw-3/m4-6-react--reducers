import React from "react";
import styled from "styled-components";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";
import { BookingContext } from "./BookingContext";

const Seat = ({ isBooked, seatId, price, rowName, seatNum }) => {
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  const handleClick = () => {
    beginBookingProcess(seatId);
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
