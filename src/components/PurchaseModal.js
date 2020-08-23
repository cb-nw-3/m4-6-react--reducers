import React from "react";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const PurchaseModal = () => {
  const {
    state: { status, error, selectedSeatId, price },
  } = React.useContext(BookingContext);

  const handleClickOpen = () => {};

  const handleClose = () => {};

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={selectedSeatId !== null}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>You'Re purchasing 1 ticket for the price of {price}</p>
            <TicketTable>
              <div>
                <p>Row</p>
                <p>Seat</p>
                <p>Price</p>
              </div>
              <div>
                <p>{Row}</p>
                <p>{Seat}</p>
                <p>{Price}</p>
              </div>
            </TicketTable>
          </DialogContentText>
          <ModalInput>
            <h2>Enter payment details</h2>
            <CreditCardContainer>
              <TextField
                autoFocus
                margin="dense"
                id="credit-card-number"
                label="Credit Card Number"
                type="number"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="pin"
                label="Pin"
                type="number"
                fullWidth
              />{" "}
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </CreditCardContainer>
          </ModalInput>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const TicketTable = styled.div``;

export default PurchaseModal;
