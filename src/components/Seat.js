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
      <img src={SeatSrc} alt="seat" />
    </Tippy>
  );
};

export default Seat;
