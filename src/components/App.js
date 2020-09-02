import React from "react";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";
import PurchaseModal from "./PurchaseModal";
import SimpleSnackbar from "./Snackbar";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
    state,
  } = React.useContext(SeatContext);

  const {
    state: { status },
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      {status === "purchased" && <SimpleSnackbar />}
      <TicketWidget
        numOfRows={state.numOfRows}
        seatsPerRow={state.seatsPerRow}
        hasLoaded={state.hasLoaded}
      />
      <PurchaseModal />
    </>
  );
}

export default App;
