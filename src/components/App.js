// Librairies
import React from "react";

// Components
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";

// Styles
import GlobalStyles from "./GlobalStyles";

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
      <TicketWidget />
    </>
  );
}

export default App;
