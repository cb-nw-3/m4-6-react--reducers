import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat";
import PurchaseModal from "./PurchaseModal";
import { BookingContext } from "./BookingContext";

const TicketWidget = () => {
  const { state } = useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  const { selectedSeatId } = useContext(BookingContext);
  return (
    <>
      {state.hasLoaded ? (
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <div key={`${rowName}-${rowIndex}-modal`}>
                <Row key={rowIndex}>
                  <RowLabel>Row {rowName}</RowLabel>
                  {range(seatsPerRow).map((seatIndex) => {
                    const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                    return (
                      <SeatWrapper key={seatId}>
                        <Seat
                          seatId={seatId}
                          rowName={rowName}
                          seatIndex={getSeatNum(seatIndex)}
                          price={state.seats[seatId].price}
                          isBooked={state.seats[seatId].isBooked}
                        />
                      </SeatWrapper>
                    );
                  })}
                </Row>
              </div>
            );
          })}
          <PurchaseModal open={selectedSeatId !== null} />
        </Wrapper>
      ) : (
        <div>
          <CircularProgress /> LOADING
        </div>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: fit-content;
  background: black;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 70px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background-color: white;
`;

export default TicketWidget;
