import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded },

    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  if (hasLoaded) {
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
                    <Seat
                      seatId={seatId}
                      rowIndex={rowIndex}
                      seatIndex={seatIndex}
                      width={36}
                      height={36}
                    />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  } else {
    return (
      <div class="root">
        <CircularProgress />
      </div>
    );
  }
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
