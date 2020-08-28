import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { seats, numOfRows, seatsPerRow, hasLoaded },
  } = React.useContext(SeatContext);
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (!hasLoaded) {
    return <CircularProgress />;
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
                const seat = seats[seatId];

                return (
                  <SeatWrapper key={seatId}>
                    <Seat
                      isBooked={seat.isBooked}
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                      price={seat.price}
                      seatNum={getSeatNum(seatIndex)}
                      rowName={rowName}
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
  background: black;
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
  background: white;
`;

export default TicketWidget;
