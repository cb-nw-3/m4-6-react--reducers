import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = React.useContext(SeatContext);
  console.log(hasLoaded);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <BigWrapper>
      {hasLoaded === true ? (
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  const isSeatBooked = seats[seatId].isBooked;
                  const seatPrice = seats[seatId].price;
                  const seatDescription = `Row ${rowName}, Seat ${getSeatNum(
                    seatIndex
                  )}`;

                  return (
                    <SeatWrapper
                      style={{
                        filter: isSeatBooked ? "grayscale(100%)" : "none",
                      }}
                      key={seatId}
                    >
                      <Seat
                        seatPrice={seatPrice}
                        isSeatBooked={isSeatBooked}
                        seatDescription={seatDescription}
                        seatId={seatId}
                      />
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      ) : (
        <CircularProgress />
      )}
    </BigWrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  background: #eee;
`;

const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  position: absolute;
  left: -75px;
  top: 15px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const BigWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TicketWidget;
