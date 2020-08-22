import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    status,
    error,
    selectedSeatId,
    price,
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      Hello
    </Dialog>
  );
};

export default PurchaseModal;
