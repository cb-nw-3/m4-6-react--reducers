import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Seat from "./Seat";
import PurchaseModal from "./PurchaseModal";

const TicketWidget = () => {
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  console.log(seats);
  if (!hasLoaded) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
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
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
              const seat = seats[seatId];
              return (
                <SeatWrapper key={seatIndex}>
                  <Seat
                    seatId={seatId}
                    rowIndex={rowIndex}
                    seatIndex={seatIndex}
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 40px 8px;
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const Row = styled.div`
  display: flex;
  position: relative;
`;

const RowLabel = styled.div`
  font-weight: bold;
  padding: 40px 30px 10px 50px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
  background: #eee;
`;
const GreyTippy = styled(Tippy)`
  background-color: #333;
  color: white;
  border-radius: 4px;
`;

export default TicketWidget;
