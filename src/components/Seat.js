import React from "react";
import seatImage from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";

import Tippy from "@tippy.js/react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

const Seat = ({ seat, row }) => {
  const { state } = React.useContext(SeatContext);
  console.log(row);
  const booked = state.seats[`${seat}`].isBooked;
  const cost = state.seats[`${seat}`].price;
  return (
    <Tippy
      content={`Row ${row}: ${seat} - $${cost}`}
      followCursor={true}
      plugins={[followCursor]}
    >
      <img
        src={seatImage}
        alt="seat"
        style={{ filter: booked ? "grayscale(100%)" : "grayscale(0%)" }}
      />
    </Tippy>
  );
};

export default Seat;
