import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "../components/TicketWidget";

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
    <Wrapper>
      <GlobalStyles />
      <TicketWidget></TicketWidget>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
