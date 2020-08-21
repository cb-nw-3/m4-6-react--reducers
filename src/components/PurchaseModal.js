import React from "react";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";
import Dialog from "@material-ui/core/Dialog";

const PurchaseModal = () => {
  const {
    state: { status, selectedSeatId },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);
  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      This a test modal
    </Dialog>
  );
};

export default PurchaseModal;
