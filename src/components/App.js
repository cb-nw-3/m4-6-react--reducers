import React from "react";
import { SeatContext } from "./SeatContext";

import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows!
    </>
  );
}

export default App;
