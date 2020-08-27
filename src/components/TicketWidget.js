import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Seat from "./Seat";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  // TODO: use values from Context

  const { numOfRows, seatsPerRow, hasLoaded, seats } = React.useContext(SeatContext);


  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  if (!hasLoaded) {
    return <CircularProgress />;
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
              const seat = seats[seatId];
              const seatNumber = getSeatNum(seatIndex);

              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Render the actual <Seat /> */}

                  <Seat 
                  isBooked={seat.isBooked}
                  price={seat.price}
                  row={rowName}
                  number={seatNumber}
                  />
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  transform: translateX(calc(-100% - 30px));
  font-size: 14px;
  color: white;
  font-weight: bold;
  line-height: 46px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
