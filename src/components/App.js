import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";

import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  const {
    state: { status },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <PurchaseModal />
      <GlobalStyles />
      <TicketWidget />
      <Snackbar
        open={status === "purchased"}
        onClose={() => {
          cancelBookingProcess();
        }}
        elevation={6}
      >
        <MuiAlert severity="success" variant="filled">
          The money you keep spending won't fill the void, you know!
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              cancelBookingProcess();
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default App;
