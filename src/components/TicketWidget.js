// Libraries
import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
// Components
import { SeatContext } from './SeatContext';
// Assets
import SeatImage from '../assets/seat-available.svg';
// Helpers
import { getRowName, getSeatNum } from '../helpers';
// Utils
import { range } from '../utils';

const TicketWidget = () => {
    const {
        state: { hasLoaded, numOfRows, seatsPerRow },
    } = React.useContext(SeatContext);

    // TODO: implement the loading spinner <CircularProgress />
    // with the hasLoaded flag
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

                            return (
                                <SeatWrapper key={seatId}>
                                    <img
                                        src={SeatImage}
                                        alt={`seat-${seatId}`}
                                    />
                                </SeatWrapper>
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

const SeatWrapper = styled.div`
    padding: 5px;
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
