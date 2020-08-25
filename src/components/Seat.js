import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";

import { getSeatNum, encodeSeatId } from "../helpers";
import seatSrc from "../assets/seat-available.svg";
import { BookingContext } from "./BookingContext";

const Seat = (props) => {
  const {
    state: { status, error, selectedSeatId, price },
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  const seatId = encodeSeatId(props.rowIndex, props.seatIndex);
  const seatPrice = props.price;

  return (
    <StyledButton
      disabled={props.status === "available" ? false : true}
      onClick={() => beginBookingProcess({ seatId, seatPrice })}
    >
      <SeatWrapper key={props.rowIndex + props.seatIndex}>
        {props.status === "available" ? (
          <StyledTippy
            content={`Row ${props.rowIndex}, seat ${getSeatNum(
              props.seatIndex
            )} - ${props.price}$`}
          >
            <img
              src={seatSrc}
              alt="seat icon"
              id={"availableSeat"}
              style={{ width: props.width, height: props.height }}
            />
          </StyledTippy>
        ) : (
          <img
            src={seatSrc}
            alt="seat icon"
            style={{
              filter: "grayscale(100%)",
              width: props.width,
              height: props.height,
            }}
          />
        )}
      </SeatWrapper>
    </StyledButton>
  );
};

const SeatWrapper = styled.div`
  padding: 5px;
`;
const StyledTippy = styled(Tippy)`
  background-color: #222;
  padding: 5px;
  border: 1px solid gray;
`;
const StyledButton = styled.button`
  border: none;
  outline: none;
`;

export default Seat;
