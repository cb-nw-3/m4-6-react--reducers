import React from "react";
import styled from "styled-components";

import { getRowName, getSeatNum } from "../helpers";
import seatImage from "../assets/seat-available.svg";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const Seat = ({ rowName, seatIndex, width, height, price, status }) => {
  const seatNumber = getSeatNum(seatIndex);
  const seatId = `${rowName}-${seatNumber}`;
  const seatText = `Row ${rowName} Seat ${seatNumber} - $${price}`;

  return (
    <Wrapper key={seatId}>
      {status ? (
        <BookedSeatWrapper>
          <DisabledButton disabled={true}>
            <img alt="seat image" src={seatImage} />;
          </DisabledButton>
        </BookedSeatWrapper>
      ) : (
        <Tippy content={seatText}>
          <SeatWrapper>
            <Button>
              <img alt="seat image" src={seatImage} />
            </Button>
          </SeatWrapper>
        </Tippy>
      )}
    </Wrapper>
  );
};

const Button = styled.button`
  border-color: transparent;
  background-color: transparent;

  :hover {
    cursor: pointer;

    background-color: blue;
  }
`;

const DisabledButton = styled.button`
  border-color: transparent;
  background-color: transparent;

  :hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  background: #eee;
  border-radius: 3px;
  padding: 8px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const BookedSeatWrapper = styled.div`
  filter: grayscale(100%);
  padding: 5px;
`;

export default Seat;
