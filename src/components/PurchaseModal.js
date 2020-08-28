import React from "react";
import { BookingContext } from "./BookingContext";

import Dialog from "@material-ui/core/Dialog";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price, status },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      Hello from PurchaseModal
    </Dialog>
  );
};

export default PurchaseModal;
