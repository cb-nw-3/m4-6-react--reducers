import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import styled from "styled-components";

function App() {
  const {
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
    <Wrapper>
      <GlobalStyles />
      <TicketWidget />
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
