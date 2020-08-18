import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import SeatSvg from "../assets/seat-available.svg";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const TicketWidget = () => {
  const { state, actions } = React.useContext(SeatContext);
  console.log(state, actions);
  const numOfRows = state.numOfRows;
  const seatsPerRow = state.seatsPerRow;

  const hasLoaded = state.hasLoaded;

  if (hasLoaded === false) {
    return (
      <>
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      </>
    );
  } else {
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
                    {state.seats[seatId].isBooked ? (
                      <GreyTippy
                        content={
                          <span>{`Row ${rowName}, Seat ${seatIndex} - $${state.seats[seatId].price}`}</span>
                        }
                        arrow={true}
                      >
                        <img
                          alt="seat image"
                          src={SeatSvg}
                          style={{ cursor: "pointer" }}
                        />
                      </GreyTippy>
                    ) : (
                      <img
                        alt="seat image"
                        src={SeatSvg}
                        style={{ filter: "grayscale(100%)" }}
                      />
                    )}
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })}
      </Wrapper>
    );
  }
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
`;

export default TicketWidget;
