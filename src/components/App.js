import React from "react";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";

import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
    state,
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget
        numOfRows={state.numOfRows}
        seatsPerRow={state.seatsPerRow}
      />
    </>
  );
}

export default App;
