import React from 'react';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';

import { SeatContext } from './SeatContext';
import { BookingContext} from './BookingContext';

//All the material ui imports:
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

    const ModalTable= (props) => {
        let rowNum = '-';
        let seatNum = '-';
        const price= props.price;

    if(props.selectedSeatId !== null){
        rowNum = props.selectedSeatId.slice(0,1);
        seatNum = props.selectedSeatId.slice(2);
    } else {
        rowNum = '-';
        seatNum = '-';
    }

    function createData(rowNum, seatNum, price) {
        return { rowNum, seatNum, price};
    }
    
    const rows = [
        createData(rowNum, seatNum, price),
    ];

return(
    <TableContainer component={Paper}>
    <Table aria-label='simple table'>
        <TableHead>
            <TableRow>
                <TableCell align="center">Row</TableCell>
                <TableCell align="center">Seat</TableCell>
                <TableCell align="center">Price</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.name}>
                    <TableCell align="center">{row.rowNum}</TableCell>
                    <TableCell align="center">{row.seatNum}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export default ModalTable;