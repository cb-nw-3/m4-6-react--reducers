import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import SeatSrc from "../assets/seat-available.svg";
import styled from "styled-components";

const Seat = ({ seatPrice, isSeatBooked, seatDescription }) => {
  return (
    <Tippy
      content={`${seatDescription} - ${seatPrice} $`}
      disabled={isSeatBooked}
    >
      <StyledButton disabled={isSeatBooked}>
        <img src={SeatSrc} alt="seat" />
      </StyledButton>
    </Tippy>
  );
};

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
`;

export default Seat;
