import React from "react";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import styled from "styled-components";

export const Seat = ({ isBooked, seatId, price }) => {
  const arr = seatId.split("-");
  const row = arr[0];
  const seat = arr[1];

  return isBooked ? (
    <StyledButton disabled={true}>
      <StyledSeat
        src={seatSrc}
        alt="seat"
        style={{ filter: isBooked && "grayscale(100%" }}
      />
    </StyledButton>
  ) : (
    <Tippy
      content={
        <span>
          Row {row}, Seat {seat} - ${price}
        </span>
      }
    >
      <StyledButton>
        <StyledSeat src={seatSrc} alt="seat" />
      </StyledButton>
    </Tippy>
  );
};

const StyledSeat = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  border: none;
`;
