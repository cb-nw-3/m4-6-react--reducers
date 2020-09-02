import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Seat from "./Seat";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = ({ numOfRows, seatsPerRow, hasLoaded }) => {
  if (!hasLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

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
                <SeatWrapper key={seatId}>
                  <Seat seat={seatId} row={rowName} seatId={seatId} />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  margin: 10vh auto auto auto;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  margin-right: 30px;
  color: #222222;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
