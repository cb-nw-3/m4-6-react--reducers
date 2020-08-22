import React from "react";
import seatSrc from "../assets/seat-available.svg";
import styled from "styled-components";

import { SeatContext } from "./SeatContext";

export const Seat = ({ isBooked }) => {
  const { state } = React.useContext(SeatContext);

  return (
    <img
      src={seatSrc}
      alt="seat"
      style={{ filter: isBooked && "grayscale(100%" }}
    />
  );
};
