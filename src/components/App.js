import React from "react";

import { SeatContext } from "./SeatContext";
import styled from "styled-components";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then(receiveSeatInfoFromServer);
  }, [receiveSeatInfoFromServer]);

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <TicketWidget />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
