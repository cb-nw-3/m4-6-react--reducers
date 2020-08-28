import React from "react";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <PurchaseModal></PurchaseModal>
      <GlobalStyles />
      This venue has {numOfRows} rows!
      <TicketWidget />
    </>
  );
}

export default App;
