import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

export default function SimpleTable({ seatId, price }) {
  const classes = useStyles();

  let seatRow;
  let seat;

  if (seatId && price) {
    seatRow = seatId.split("-")[0];
    seat = seatId.split("-")[1];
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Seat</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell scope="row">{seatRow}</TableCell>
            <TableCell>{seat}</TableCell>
            <TableCell>${price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
