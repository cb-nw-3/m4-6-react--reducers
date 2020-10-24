import React from "react";
import { SeatContext } from "./SeatContext";

import availableSeatImage from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ rowIndex, seatId, width, height, price, status }) => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded, isBooked },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  const seat = seats[seatId];

  const image = seat ? (
    <img
      style={{ filter: "grayscale(100%)" }}
      alt="seat-available.svg"
      src={availableSeatImage}
    />
  ) : (
    <img alt="seat-available.svg" src={availableSeatImage} />
  );
  const buttonClicked = () => {
    console.log(`${seatId} was clicked`);
  };
  return (
    <Tippy content={seatId}>
      <button disabled={status === "unavailable"} onClick={buttonClicked}>
        {image}
      </button>
    </Tippy>
  );
};

export default Seat;
