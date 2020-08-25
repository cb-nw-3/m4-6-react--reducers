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

import { decodeSeatId } from "../helpers";
import CircularProgress from "@material-ui/core/CircularProgress";

const PurchaseModal = () => {
  const {
    state: { status, error, selectedSeatId, price },
    actions: {
      beginBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
      cancelBookingProcess,
    },
  } = React.useContext(BookingContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);

  const handleClickOpen = () => {};

  const handleClose = () => {
    const creditCardInputType = typeof parseInt(creditCard) === "number";
    if (
      creditCardInputType &&
      creditCard.length === 16 &&
      expiration.length !== 6
    ) {
      purchaseTicketFailure({});
    }
  };

  return (
    <>
      <Dialog
        open={selectedSeatId !== null}
        onClose={cancelBookingProcess}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're purchasing 1 ticket for the price of {price}
          </DialogContentText>
          <TicketTable>
            <div>
              <p>Row</p>
              <p>Seat</p>
              <p>Price</p>
            </div>
            <div>
              <p>{rowName}</p>
              <p>{seatNum}</p>
              <p>{price}</p>
            </div>
          </TicketTable>
          <ModalInput
            onSubmit={(ev) => {
              ev.preventDefault()

              purchaseTicketRequest();

              fetch("/api/book-seat", {
                method: "POST",
                body: JSON.stringify({
                  creditCard,
                  expiration,
                  seatId: selectedSeatId,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  let errorMessage = data.message;
                  if (data.success) {
                    purchaseTicketSuccess();
                  } else {
                    purchaseTicketFailure(data.message);
                    console.log(data.message)
                  }
                })
                .catch((err) => {
                  purchaseTicketFailure("Alarm.Alarm.Alarm");
                });
            }}
          >
            <h3>Enter payment details</h3>
            <CreditCardContainer>
              <TextField
                autoFocus
                margin="dense"
                id="credit-card-number"
                label="Credit Card Number"
                type="text"
                fullWidth
                onChange={(ev) => setCreditCard(ev.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="pin"
                label="Pin"
                type="text"
                fullWidth
                onChange={(ev) => setExpiration(ev.target.value)}
              />
              <DialogActions>
                {error ? <p style={{color: 'red'}}>{error}</p> : null}
                <Button color="primary" type='submit'>
                  {status === "awaiting-response" ? (
                    <CircularProgress />
                  ) : (
                    "Purchase"
                  )}
                </Button>
              </DialogActions>
            </CreditCardContainer>
          </ModalInput>
        </DialogContent>
      </Dialog>
    </>
  );
};

const TicketTable = styled.div``;
const ModalInput = styled.form``;
const CreditCardContainer = styled.div``;

export default PurchaseModal;
