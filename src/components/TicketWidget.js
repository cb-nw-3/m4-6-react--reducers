import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Seat from "./Seat";

const TicketWidget = () => {
  const {
    state: { seats, numOfRows, seatsPerRow, hasLoaded },
  } = React.useContext(SeatContext);

  return (
    <Wrapper>
      {!hasLoaded ? (
        <CircularProgress />
      ) : (
        <SeatTable>
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
                        rowIndex={rowIndex}
                        seatIndex={seatIndex}
                        seatId={seatId}
                        width={36}
                        height={36}
                        price={seat.price}
                        status={seat.isBooked ? "unavailable" : "available"}
                      />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </SeatTable>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 75vh;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #585858;
`;
const SeatTable = styled.div`
  border-radius: 10px;
  background: white;
  padding: 20px;
`;
const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #585858;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  margin-right: 20px;
  color: #585858;
`;

const SeatWrapper = styled.div`
  padding: 10px;
  background-color: white;
`;

export default TicketWidget;
