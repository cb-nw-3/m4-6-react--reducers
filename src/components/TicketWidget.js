import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import seatImage from "../assets/seat-available.svg";
import SpinnerJustKF from "./SpinnerJustKF.js";

const TicketWidget = () => {
  // TODO: use values from Context

  const {
    state: { hasLoaded, numOfRows, seatsPerRow },
    actions: { recieveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  // const numOfRows = 6;
  // const seatsPerRow = 6;
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  console.log(hasLoaded);
  return (
    <Wrapper>
      {hasLoaded ? (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);
          console.log(rowName);
          console.log(seatsPerRow);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                return (
                  <SeatWrapper key={seatId}>
                    {/* TODO: Render the actual <Seat /> */}
                    <img alt="seat image" src={seatImage} />;
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      ) : (
        <SpinnerJustKF />
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
