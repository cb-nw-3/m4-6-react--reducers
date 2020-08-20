import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tippy from "@tippyjs/react";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import seatSrc from "../assets/seat-available.svg";

const TicketWidget = () => {
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  return (
    <Wrapper>
      {!hasLoaded ? (
        <CircularProgress />
      ) : (
        range(numOfRows).map((rowIndex) => {
          const rowName = getRowName(rowIndex);

          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map((seatIndex) => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                console.log(seats[seatId].isBooked);
                return (
                  <SeatWrapper key={seatId}>
                    {seats[seatId].isBooked ? (
                      <Tippy
                        content={`Row ${rowName}, seat ${getSeatNum(
                          seatIndex
                        )} - ${seats[seatId].price}$`}
                      >
                        <Seat
                          src={seatSrc}
                          alt="seat icon"
                          id={"availableSeat"}
                        />
                      </Tippy>
                    ) : (
                      <Seat
                        src={seatSrc}
                        alt="seat icon"
                        style={{ filter: "grayscale(100%)" }}
                      />
                    )}
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
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
  align-items: center;
  color: gray;

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

const Seat = styled.img``;

export default TicketWidget;
