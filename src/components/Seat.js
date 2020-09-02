import React from "react";
import seatImage from "../assets/seat-available.svg";
import { SeatContext } from "./SeatContext";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import { followCursor } from "tippy.js";
import "tippy.js/dist/tippy.css";

import { BookingContext } from "./BookingContext";

const Seat = ({ seat, row, seatId }) => {
  const { state } = React.useContext(SeatContext);
  const {
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);
  const booked = state.seats[`${seat}`].isBooked;
  const cost = state.seats[`${seat}`].price;
  return (
    <Tippy
      content={`Row ${row}: ${seat} - $${cost}`}
      followCursor={true}
      plugins={[followCursor]}
    >
      <StyledButton
        displayed={booked}
        onClick={() => {
          beginBookingProcess({ price: cost, selectedSeatId: seatId });
        }}
      >
        <img
          src={seatImage}
          alt="seat"
          style={{ filter: booked ? "grayscale(100%)" : "grayscale(0%)" }}
        />
      </StyledButton>
    </Tippy>
  );
};

export default Seat;

const StyledButton = styled.button`
  border: 0px;
`;
