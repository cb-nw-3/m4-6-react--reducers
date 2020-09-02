// Librairies
import React from "react";

// Components
import { SeatContext } from "./SeatContext";

// Styles
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    state: { numOfRows },
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
      Testing 1 2 3 {numOfRows}
    </>
  );
}

export default App;
