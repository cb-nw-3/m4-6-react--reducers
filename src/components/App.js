import React from "react";
import styled from "styled-components";

import { SeatContext } from "./SeatContext";
import GlobalStyles from "./GlobalStyles";

import TicketWidget from "./TicketWidget";

function App() {
  const {
    numOfRows,
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      // .then((json) => console.log(json))
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      {/* <h1>There are {numOfRows}</h1> */}
      <Centered>
        <TicketWidget />
      </Centered>
    </>
  );
}

const Centered = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
