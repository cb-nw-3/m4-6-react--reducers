import React from "react";
import styled from "styled-components";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";

import SeatPicture from "../assets/seat-available.svg";

const Seat = ({ isBooked, price, number, row }) => {
  return (
    <Tippy
      content={`This is ${row}-${number} - the price is $ ${price}`}
      theme="material"
    >
      <Button disabled={isBooked}>
        <img src={SeatPicture} alt="seat-picture" />
      </Button>
    </Tippy>
  );
};

const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  &:disabled img {
    filter: grayscale(100%);
  }
`;

export default Seat;
