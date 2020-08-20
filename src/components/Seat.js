import React from "react";
import styled from "styled-components";
// import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import SeatSvg from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { getRowName, getSeatNum } from "../helpers";

const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
  const rowName = getRowName(rowIndex);
  const seatNum = getSeatNum(seatIndex);

  return (
    <GreyTippy
      content={<span>{`Row ${rowName}, Seat ${seatNum} - $${price}`}</span>}
      arrow={true}
    >
      <Wrapper disabled={status === "unavailable"}>
        <img alt="seat image" src={SeatSvg} style={{ width, height }} />
      </Wrapper>
    </GreyTippy>
  );
};

const GreyTippy = styled(Tippy)`
  background-color: #333;
  color: white;
  border-radius: 4px;
`;
const Wrapper = styled.button`
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;

  &:disabled img {
    filter: grayscale(100%);
    cursor: default;
  }
`;

export default Seat;
