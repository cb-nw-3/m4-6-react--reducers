import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";

import { SeatContext } from "./SeatProvider";

import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";
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
      <Centered>
        <TicketWidget />
      </Centered>
      <PurchaseModal />
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
