import React, { useContext, useEffect } from "react";

import GlobalStyles from "./GlobalStyles";

import { SeatContext } from "./SeatProvider";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      // .then((data) => console.log(data))
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <h1>This Venue has {numOfRows} rows!</h1>
    </>
  );
}

export default App;
