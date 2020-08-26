import React from "react";

import GlobalStyles from "./GlobalStyles";

import { SeatContext } from "./SeatContext";

function App() {
  const {
    actions: { recieveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch(`/api/seat-availability`)
      .then((res) => res.json)
      .then((data) => console.log(data))
      .then((data) => recieveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      TODO: write code
    </>
  );
}

export default App;
