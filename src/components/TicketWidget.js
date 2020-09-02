// Libraries
import React from "react";

// Styles
import styled from "styled-components";

// Assets
import CircularProgress from "@material-ui/core/CircularProgress";

// Components
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import SeatAvailableImage from "./SeatAvailableImage";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded },
  } = React.useContext(SeatContext);

  return (
    <Wrapper>
      {!hasLoaded ? (
        <CircularProgress />
      ) : (
        <>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

                  return (
                    <SeatWrapper key={seatId}>
                      <SeatAvailableImage />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  margin: 25%;
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
