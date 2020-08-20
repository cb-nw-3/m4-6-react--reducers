import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        console.log(data);
        receiveSeatInfoFromServer(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      TODO: write code
    </>
  );
}

export default App;
