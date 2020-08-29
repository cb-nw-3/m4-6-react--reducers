import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import seatImage from "../assets/seat-available.svg";
import SpinnerJustKF from "./SpinnerJustKF.js";
import Seat from "./Seat.js";

import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  // TODO: use values from Context

  const {
    state: { hasLoaded, numOfRows, seatsPerRow, ...state },
    actions: { recieveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  // const numOfRows = 6;
  // const seatsPerRow = 6;
  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag
  console.log(hasLoaded);

  if (!hasLoaded) {
    return (
      <Wrapper>
        <SpinnerJustKF />
      </Wrapper>
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
              const seatNumber = getSeatNum(seatIndex);
              const seatId = `${rowName}-${seatNumber}`;
              const seatPrice = state.seats[seatId].price;
              const seatText = `Row ${rowName} Seat ${seatNumber} - $${seatPrice}`;

              return (
                <Seat
                  rowName={rowName}
                  seatIndex={seatIndex}
                  width={36}
                  height={36}
                  price={seatPrice}
                  status={state.seats[seatId].isBooked}
                ></Seat>
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

export default TicketWidget;
