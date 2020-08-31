import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import Tippy from "@tippyjs/react";

import seatAvailableSrc from "../assets/seat-available.svg";

const Seat = ({ rowIndex, seatIndex, width, height, price, status }) => {
  if (status === "available") {
    return (
      <SeatTippy content={`Row ${rowIndex}, Seat ${seatIndex}, $${price}`}>
        <Button>
          <img src={seatAvailableSrc}></img>
        </Button>
      </SeatTippy>
    );
  } else {
    return <GrayImage src={seatAvailableSrc} />;
  }
};

const GrayImage = styled.img`
  filter: grayscale(100%);
`;

const SeatTippy = styled(Tippy)`
  color: white;
  background: gray;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
`;
export default Seat;
