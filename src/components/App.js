import React from 'react';

import GlobalStyles from './GlobalStyles';
import { SeatContext } from './SeatContext';
import { BookingContext } from './BookingContext';
import TicketWidget from './TicketWidget';

function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  const {
    status,
    actions: { selectSeatForPurchase }
  } = React.useContext(BookingContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => {
        receiveSeatInfoFromServer(data);
      });
  }, []);

  return (
    <>
      <GlobalStyles />
      <TicketWidget />
    </>
  );
}

export default App;
