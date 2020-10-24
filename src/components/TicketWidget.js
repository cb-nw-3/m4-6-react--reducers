import React from "react";
import styled from "styled-components";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat.js";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded },
  } = React.useContext(SeatContext);

  if (hasLoaded === false) {
    return <p>Is loading!</p>;
  } else {
    return (
      <Wrapper>
        {range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                return (
                  <SeatWrapper key={seatIndex}>
                    <Seat
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                      price={seats[seatId].price}
                      status={
                        seats[seatId].isBooked ? "unavailable" : "available"
                      }
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;
const Row = styled.div`
  display: flex;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;
const RowLabel = styled.div`
  font-weight: bold;
`;
const SeatWrapper = styled.div`
  padding: 5px;
`;
export default TicketWidget;
