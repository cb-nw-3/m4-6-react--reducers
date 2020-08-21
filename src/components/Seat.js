import React from "react";
import styled from "styled-components";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import { COLORS } from "../theme";

const Seat = ({ seatId, rowName, seatIndex, price, isBooked }) => {
  return (
    <TippyF content={`Row ${rowName}, seat ${seatIndex} - $${price}`}>
      {
        <button disabled={isBooked}>
          <SeatImg
            alt={`seat ${seatId} is ${isBooked ? "booked" : "available"}`}
            src={seatSrc}
            style={
              isBooked
                ? {
                    filter: "grayscale(100%)",
                  }
                : {}
            }
          />
        </button>
      }
    </TippyF>
  );
};

const TippyF = styled(Tippy)`
  background-color: ${COLORS.secondary};
  padding: 6px 10px;
  border-radius: 6px;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: solid 15px ${COLORS.secondary};
    border-left: solid 15px transparent;
    border-right: solid 15px transparent;
  }
`;

const SeatImg = styled.img``;

export default Seat;
