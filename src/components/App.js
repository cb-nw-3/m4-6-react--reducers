// Libraries
import React from 'react';
// Components
import { SeatContext } from './SeatContext';
import TicketWidget from './TicketWidget';
// Styles
import GlobalStyles from './GlobalStyles';

function App() {
    const {
        state: { numOfRows },
        actions: { receiveSeatInfoFromServer },
    } = React.useContext(SeatContext);

    React.useEffect(() => {
        fetch('/api/seat-availability', { method: 'GET' })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Unable to complete fetch GET request.');
                }
            })
            .then((data) => {
                receiveSeatInfoFromServer(data);
            })
            .catch((error) => {
                console.log('Error ', error);
            });
    }, [receiveSeatInfoFromServer]);

    return (
        <>
            <GlobalStyles />
            <TicketWidget />
        </>
    );
}

export default App;
