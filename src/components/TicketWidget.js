import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { Seat } from "./Seat";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  const { state } = React.useContext(SeatContext);

  const { numOfRows, seatsPerRow, hasLoaded, seats } = state;

  return !hasLoaded ? (
    <SpinnerWrapper>
      <CircularProgress />
    </SpinnerWrapper>
  ) : (
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
                  <Seat isBooked={seats[seatId].isBooked} />
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

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default TicketWidget;
