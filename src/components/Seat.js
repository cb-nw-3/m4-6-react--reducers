import React from "react";
import styled from "styled-components";
// import Modal from "react-modal";
// import { ReactComponent as Icon } from "../assets/seat-available.svg";
import ImgSrc from "../assets/seat-available.svg";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import "./style.css";
import { BookingContext } from "./BookingContext";
import FormDialog from "./PurchaseModal";

const Seat = (props) => {
  const { rowName, seatName, seatPrice, isBooked, seatId } = props;
  const {
    state,
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  console.log("state in seat: ", state);

  return (
    <>
      {isBooked == false ? (
        <Tippy
          content={
            <div>
              <span>Row: {rowName} </span>
              <span>Seat: {seatName} </span>
              <span>Price: {seatPrice} </span>
            </div>
          }
        >
          <SeatButton
            disabled={false}
            onClick={() => {
              const data = {
                row: rowName,
                seat: seatName,
                price: seatPrice,
                seatId: seatId,
              };
              beginBookingProcess(data);
            }}
          >
            <SeatAvailable src={ImgSrc}></SeatAvailable>
          </SeatButton>
        </Tippy>
      ) : (
        <SeatButton disabled={true} onClick={() => {}}>
          <SeatAvailable src={ImgSrc}></SeatAvailable>
        </SeatButton>
      )}
    </>
  );
};

const SeatButton = styled.button`
  border: none;
  filter: ${(props) => (props.disabled ? "grayscale(100%)" : "")};
`;

const SeatAvailable = styled.img``;

export default Seat;
