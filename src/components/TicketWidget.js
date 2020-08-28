import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Seat from "./Seat";

/* ... */

// const HeaderImage = styled.div`
//   background-image: url(${myImage});
// `;

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  // TODO: use values from Context
  const { state } = React.useContext(SeatContext);

  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  console.log("state in Ticket: ", state);

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
              const seatName = getSeatNum(seatIndex);
              const seatPrice = state["seats"][seatId]["price"];
              const isBooked = state["seats"][seatId]["isBooked"];

              return (
                <SeatWrapper key={seatId}>
                  <Seat
                    rowName={rowName}
                    seatName={seatName}
                    seatPrice={seatPrice}
                    isBooked={isBooked}
                    seatId={seatId}
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
  margin: 0 auto;
  width: fit-content;
  margin-top: 5%;
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
  left: -8%;
  top: 28%;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
