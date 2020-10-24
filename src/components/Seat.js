import React from "react";
import { SeatContext } from "./SeatContext";

import availableSeatImage from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ seatId }) => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded, isBooked },
  } = React.useContext(SeatContext);

  return (
    <Tippy content={seatId}>
      <button
        disabled={seats[seatId].isBooked}
        // onClick={console.log("clicked")}
      >
        {seats[seatId].isBooked ? (
          <img
            style={{ filter: "grayscale(100%)" }}
            alt="seat-available.svg"
            src={availableSeatImage}
          />
        ) : (
          <img alt="seat-available.svg" src={availableSeatImage} />
        )}
      </button>
    </Tippy>
  );
};

export default Seat;
