import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "../components/TicketWidget";
import PurchaseModal from "./PurchaseModal";
import { BookingContext } from "./BookingContext";
import YesPurchase from './YesPurchase';

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  const {
    state: { status },
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <MainContainer>
        <TicketWidget></TicketWidget>
        <PurchaseModal />
        {status === "purchased" ? <YesPurchase/> : null}
      </MainContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default App;
