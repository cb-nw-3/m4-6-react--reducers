import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import seatSrc from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import { COLORS } from "../theme";

const TicketWidget = () => {
  const { state } = useContext(SeatContext);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;
  console.log(state);

  return (
    <>
      {state.hasLoaded ? (
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
                      <TippyF
                        content={`Row ${rowName}, seat ${getSeatNum(
                          seatIndex
                        )} - $${state.seats[seatId].price}`}
                      >
                        {
                          <SeatImg
                            alt={`seat ${seatId} is ${
                              state.seats[seatId].isBooked
                                ? "booked"
                                : "available"
                            }`}
                            src={seatSrc}
                            style={
                              state.seats[seatId].isBooked
                                ? {
                                    filter: "grayscale(100%)",
                                  }
                                : {}
                            }
                          />
                        }
                      </TippyF>
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      ) : (
        <div>
          <CircularProgress /> LOADING
        </div>
      )}
    </>
  );
};

const TippyF = styled(Tippy)`
  background-color: ${COLORS.secondary};
  padding: 6px 10px;
  border-radius: 6px;
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-top: solid 15px ${COLORS.secondary};
    border-left: solid 15px transparent;
    border-right: solid 15px transparent;
  }
`;

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

const SeatImg = styled.img``;

export default TicketWidget;
