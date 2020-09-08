import React from "react";
import seatAvailableSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ rowName, seatNum, price, isBooked }) => {
  console.log(seatNum);
  return (
    <Tippy content={`Row ${rowName}, Seat ${seatNum} - $ ${price}`}>
      <button style={{ border: "none", cursor: "pointer" }}>
        <img
          alt="Seat-image"
          src={seatAvailableSrc}
          style={{ filter: isBooked ? "grayscale(100%)" : "" }}
        />
      </button>
    </Tippy>
  );
};

export default Seat;
