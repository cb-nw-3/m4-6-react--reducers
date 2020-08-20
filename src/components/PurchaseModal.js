import React from "react";
import { Dialog } from "@material-ui/core";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  console.log(selectedSeatId);
  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      <div>ALLO THIs IS A MODAL</div>
    </Dialog>
  );
};

export default PurchaseModal;
