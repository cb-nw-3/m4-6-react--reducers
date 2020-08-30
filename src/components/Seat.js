import React, { useContext } from "react";
import availableSeatImage from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ seatId }) => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded, isBooked },

    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  const seat = seats[seatId];
  const price = seat.price;
  const image = seat.isBooked ? (
    <Img1 alt="seat-available.svg" src={availableSeatImage} />
  ) : (
    <img alt="seat-available.svg" src={availableSeatImage} />
  );
  const buttonClicked = () => {
    console.log(`${seatId} was clicked`);
  };
  return (
    <Tippy content={seatId}>
      <button disabled={seat.isBooked} onClick={buttonClicked}>
        {image}
      </button>
    </Tippy>
  );
};

export default Seat;

const Img1 = styled.img`
  filter: grayscale(100%);
`;
