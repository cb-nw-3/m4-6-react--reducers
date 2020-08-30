import React from "react";
import TicketWidget from "./TicketWidget.js";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { numOfRows, seatsPerRow, seats, hasLoaded },
    //AND SEATS PER ROW ETC?
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
      <TicketWidget />
      This venue has {numOfRows} rows!Wow!
    </>
  );
}

export default App;
