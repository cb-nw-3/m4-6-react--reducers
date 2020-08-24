import React from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { BookingContext } from "./BookingContext";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  const {
    actions: { dismissSnackbar },
    status,
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
      <PurchaseModal />
      <Snackbar open={status === "purchased"} severity="success">
        <Alert
          severity="success"
          elevation={6}
          onClose={dismissSnackbar}
          variant="filled"
        >
          Congratulations! You have purchased yourself a ticket! Enjoy!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
