import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import seatSrc from "../assets/seat-available.svg";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";

const TicketWidget = () => {
  // TODO: use values from Context
  const { state } = React.useContext(SeatContext);
  console.log(state);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <>
      {" "}
      {!state.hasLoaded && <CircularProgress />}
      {state.hasLoaded && (
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
                      <ButtonWrapper disabled={state.seats[seatId].isBooked}>
                        {<img alt="seat" src={seatSrc} />}
                        <ToolTip>
                          {rowName}, Seat {getSeatNum(seatIndex)} -{" "}
                          {state.seats[seatId].price}$
                        </ToolTip>
                      </ButtonWrapper>
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      )}
    </>
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

const ButtonWrapper = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  nackground-color: transparent;
  cursor: pointer;
  position: relative;

  &:focus {
    outline: none;
  }

  &:disabled img {
    filter: grayscale(100%);
  }

  &:hover span {
    display: inline;
  }
`;

const ToolTip = styled.span`
  position: absolute;
  background: #222;
  z-index: 99;
  top: -20px;
  left: 0;
  padding: 2px;
  color: #fff;
  display: none;
  min-width: 120px;
`;

export default TicketWidget;
