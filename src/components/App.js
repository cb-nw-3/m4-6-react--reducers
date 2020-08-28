import React from "react";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";
import GlobalStyles from "./GlobalStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import PurchaseModal from "./PurchaseModal";

function App() {
  const [seatList, setSeatList] = React.useState(false);
  const {
    state,
    actions: { receiveSeatInfoFromServer, setLoading },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    setLoading();
    fetch("/api/seat-availability")
      .then((res) => res.json())
      .then((data) => receiveSeatInfoFromServer(data));
  }, [seatList]);

  return (
    <>
      {state.hasLoaded ? (
        <>
          <GlobalStyles />
          <TicketWidget />
          <PurchaseModal seatList={seatList} setSeatList={setSeatList} />
        </>
      ) : (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
    </>
  );
}

export default App;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loader = styled(CircularProgress)``;
