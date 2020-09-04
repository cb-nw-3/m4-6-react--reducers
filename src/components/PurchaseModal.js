import React from "react";
import styled from "styled-components";

import { getRowName, getSeatNum } from "../helpers";
import { BookingContext } from "./BookingContext";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const PurchaseModal = ({ openSeatID, passed_price, rowName, seatNumber }) => {
  const {
    state: { status, error, selectedSeatId, price, ...state },
    actions: { beginBookingProcess },
  } = React.useContext(BookingContext);

  function handleClose() {}

  function handleSubmit(event) {
    console.log(event.target);
  }

  function handleCreditCardChange(event) {
    console.log(event.target.value);
  }

  function handleExpiraton(event) {
    console.log(event.target.value);
  }

  //   console.log(state);
  return (
    <Wrapper>
      <Dialog open={openSeatID !== null} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{"Purchase ticket"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You're purchasing 1 ticket for the price of {passed_price}.
            <TableBody>
              <TableRow>
                <TableCell align="right">Row</TableCell>
                <TableCell align="right">Seat</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">{rowName}</TableCell>
                <TableCell align="right">{seatNumber}</TableCell>
                <TableCell align="right">{passed_price}</TableCell>
              </TableRow>
            </TableBody>
          </DialogContentText>

          <PaymentDiv>
            <strong>Enter payment details</strong>
            <div>
              <form noValidate autoComplete="off">
                <TextField
                  id="credit-card"
                  label="Credit Card"
                  variant="outlined"
                  onChange={handleCreditCardChange}
                />
                <TextField
                  id="expiration"
                  label="Expiration"
                  variant="outlined"
                  onChange={handleExpiraton}
                />
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
            </div>
          </PaymentDiv>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

const PaymentDiv = styled.div`
  background: lightgray;
  padding: 8px;
`;

const Wrapper = styled.div`
  background: #eee;
  border-radius: 3px;
  padding: 8px;
`;

export default PurchaseModal;
