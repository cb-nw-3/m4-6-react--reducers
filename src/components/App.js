import React from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";

function App() {
  const {
    state: { numOfRows, seatsPerRow },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <PurchaseModal></PurchaseModal>
      This venue has {numOfRows} rows!
      <TicketWidget />
    </>
  );
}

export default App;
