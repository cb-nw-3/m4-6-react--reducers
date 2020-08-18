import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("api/seat-availability")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        receiveSeatInfoFromServer(data);
      });
  }, []);
  return (
    <>
      <GlobalStyles />
      there are {numOfRows} in this theater
    </>
  );
}

export default App;
