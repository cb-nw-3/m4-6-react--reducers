import React from "react";
import seatSrc from "../assets/seat-available.svg";

export const Seat = ({ isBooked }) => {
  return (
    <img
      src={seatSrc}
      alt="seat"
      style={{ filter: isBooked && "grayscale(100%" }}
    />
  );
};
