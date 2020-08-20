import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { BookingContext } from "./BookingContext";
import { getRowName, getSeatNum } from "../helpers";
import seatAvailable from "../assets/seat-available.svg";

const Seat = ({
  rowIndex,
  seatIndex,
  seatId,
  width,
  height,
  price,
  status,
}) => {
  const {
    actions: { startBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <StyledTippy
      content={`Row ${getRowName(rowIndex)}, Seat ${getSeatNum(
        seatIndex
      )} - $${price}`}
      delay={[100, 50]}
      arrow={true}
    >
      <Button
        onClick={() => {
          startBookingProcess({ seatId, price });
        }}
        disabled={status === "unavailable"}
      >
        <img
          src={seatAvailable}
          alt="seat icon"
          style={{
            filter: status === "unavailable" ? "grayscale(100%)" : "none",
          }}
        />
      </Button>
    </StyledTippy>
  );
};

const StyledTippy = styled(Tippy)`
  background: black;
  border-radius: 4px;
  padding: 3px 5px;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

export default Seat;
