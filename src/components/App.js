import React from "react";
import styled from "styled-components";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "../components/TicketWidget";
import PurchaseModal from "./PurchaseModal";
import { BookingContext } from "./BookingContext";


function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);
  const {
    state: { status, error, selectedSeatId, price },
    actions: {
      beginBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
      cancelBookingProcess,
    },
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      <TicketWidget></TicketWidget>
      <PurchaseModal />
      {status === "purchased" ? <p>Success</p> : null}
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
