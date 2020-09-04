import React from "react";

import GlobalStyles from "./GlobalStyles";
import TicketWidget from "./TicketWidget";
import { SeatContext } from "./SeatContext";

function App() {
  const {
    state: { numOfRows },
    actions: { recieveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch(`/api/seat-availability`)
      .then((res) => res.json())
      .then((data) => recieveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget> </TicketWidget>
    </>
  );
}

export default App;
