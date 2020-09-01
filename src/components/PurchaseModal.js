import React from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

import { ModalContext } from './ModalContext';

// well, if we're gonna use material anyways...

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const PurchaseDialog = styled(Dialog)`
    min-width: 600px;
`

const PurchaseForm = styled.form`
    padding: 20px;
`

const CCInput = styled.input``

const ExpirationInput = styled.input``

const PurchaseModal = (props) => {
    const {
        modalSeat,
        setModalSeat
    } = React.useContext(ModalContext);
    console.log(modalSeat);
    return (
        <PurchaseDialog open={props.open}>
            <PurchaseForm>
                <h1>Purchase ticket</h1>

                <p>You're purchasing <strong>1</strong> ticket for the price of ${modalSeat.price}.</p>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Row</TableCell>
                            <TableCell>Seat</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{modalSeat.rowLetter}</TableCell>
                            <TableCell>{modalSeat.seatNum}</TableCell>
                            <TableCell>${modalSeat.price}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <h2>Enter your CC details:</h2>

                <CCInput placeholder="Credit card"></CCInput>
                <ExpirationInput placeholder="Expiration"></ExpirationInput>
                <button>Purchase</button>

            </PurchaseForm>
            <button onClick={() => setModalSeat(undefined)}>Cancel</button>
        </PurchaseDialog >
    )
}

export default PurchaseModal;