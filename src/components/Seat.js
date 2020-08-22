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
    <StyledSeat
      src={seatSrc}
      alt="seat"
      style={{ filter: isBooked && "grayscale(100%" }}
    />
  ) : (
    <Tippy
      content={
        <span>
          Row {row}, Seat {seat} - ${price}
        </span>
      }
    >
      <StyledSeat src={seatSrc} alt="seat" />
    </Tippy>
  );
};

const StyledSeat = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
