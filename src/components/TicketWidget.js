import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = React.useContext(SeatContext);

  return (
    <Wrapper>
      {!hasLoaded ? (
        <CircularProgress />
      ) : (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                return (
                  <Seat
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
                    width={36}
                    height={36}
                    price={seats[seatId].price}
                    status={seats[seatId].isBooked ? "unavailable" : "available"}
                  ></Seat>
                );
              })}
            </Row>
          );
        })
      )}
    </Wrapper>
  );
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
  align-items: center;
  color: gray;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;
const RowLabel = styled.div`
  font-weight: bold;
`;

export default TicketWidget;
