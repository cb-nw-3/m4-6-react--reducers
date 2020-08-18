import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";

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
      <div>numOfRows: {numOfRows}</div>
      <div>seatsPerRow: {seatsPerRow}</div>
    </>
  );
}

export default App;
