// Libraries
import React from 'react';
import styled from 'styled-components';
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
            <Wrapper>
                <GlobalStyles />
                <TicketWidget />
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222;
`;

export default App;
