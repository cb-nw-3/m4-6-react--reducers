import React from "react";
import styled from "styled-components";

import { getRowName, getSeatNum } from "../helpers";
import { BookingContext } from "./BookingContext";
import Dialog from "@material-ui/core/Dialog";

const PurchaseModal = ({ openSeatID }) => {
  const {
    state: { status, error, selectedSeatId, price, ...state },
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  //   console.log(state);
  return (
    <Wrapper>
      <Dialog open={openSeatID !== null}>{openSeatID}</Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border-radius: 3px;
  padding: 8px;
`;

export default PurchaseModal;
