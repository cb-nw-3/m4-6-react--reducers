import React from 'react';
import styled from 'styled-components/macro';
import { SeatContext } from './SeatContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Seat from './Seat';

const TicketWidget = () => {
  const {
    state: {
      hasLoaded,
    }
  } = React.useContext(SeatContext);

  if (!hasLoaded) {
    return (
      <Circular>
        <CircularProgress />
      </Circular>
    )
  }
  return (
    <Wrapper>
      <Seat
        width={36}
        height={36}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const Circular = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TicketWidget;
