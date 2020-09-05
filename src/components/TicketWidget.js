import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import seatAvailableSrc from "../assets/seat-available.svg";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  console.log(hasLoaded, seats, numOfRows, seatsPerRow);

  const Seat = () => {
    return <img alt="Seat-image" src={seatAvailableSrc} />;
  };

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

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
                  <Seat />
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

export default TicketWidget;
