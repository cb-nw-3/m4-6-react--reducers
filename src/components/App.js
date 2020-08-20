import React, { useContext, useEffect } from "react";
import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = useContext(SeatContext);

  useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [receiveSeatInfoFromServer]);
  return (
    <>
      <GlobalStyles />
      TODO: write code
    </>
  );
}

export default App;
