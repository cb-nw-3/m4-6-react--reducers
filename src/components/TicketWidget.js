// Libraries
import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import { SeatContext } from './SeatContext';
import Seat from './Seat';
// Helpers
import { getRowName, getSeatNum } from '../helpers';
// Utils
import { range } from '../utils';
// Styles
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale-subtle.css';

const TicketWidget = () => {
    const {
        state: { hasLoaded, seats, numOfRows, seatsPerRow },
    } = React.useContext(SeatContext);

    if (!hasLoaded) {
        return (
            <>
                <LoaderWrapper>
                    <LoaderDiv>
                        <CircularProgress />
                    </LoaderDiv>
                </LoaderWrapper>
            </>
        );
    }

    return (
        <Wrapper>
            {range(numOfRows).map((rowIndex) => {
                const rowName = getRowName(rowIndex);

                return (
                    <Row key={rowIndex}>
                        <RowLabel>Row {rowName}</RowLabel>
                        {range(seatsPerRow).map((seatIndex) => {
                            const seatId = `${rowName}-${getSeatNum(
                                seatIndex
                            )}`;
                            const seat = seats[seatId];

                            return (
                                <div key={seatId}>
                                    <Seat
                                        rowIndex={rowIndex}
                                        seatIndex={seatIndex}
                                        status={
                                            seat.isBooked
                                                ? 'unavailable'
                                                : 'available'
                                        }
                                    />
                                </div>
                            );
                        })}
                    </Row>
                );
            })}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 8px;
`;

const Row = styled.div`
    display: flex;
    position: relative;

    &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
    }
`;

const RowLabel = styled.div`
    font-weight: bold;
    padding-top: 20px;
`;

const LoaderWrapper = styled.div`
    background: #eee;
`;

const LoaderDiv = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
`;

export default TicketWidget;
