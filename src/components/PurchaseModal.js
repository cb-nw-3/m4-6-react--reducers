import React from "react";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

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
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
      cancelBookingProcess,
    },
  } = React.useContext(BookingContext);
  const {
    actions: { markSeatAsBooked },
  } = React.useContext(SeatContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);

  return (
    <>
      <Dialog
        open={selectedSeatId !== null}
        onClose={cancelBookingProcess}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          <DialogContentText style={{ margin: "20px" }}>
            You're purchasing <strong>1</strong> ticket for the price of {price}
            $
          </DialogContentText>
          <TicketTable>
            <TableItem>Row</TableItem>
            <TableItem>Seat</TableItem>
            <TableItem>Price</TableItem>
            <TableItem>{rowName}</TableItem>
            <TableItem>{seatNum}</TableItem>
            <TableItem>{price}</TableItem>
          </TicketTable>
          <ModalInput
            onSubmit={(ev) => {
              ev.preventDefault();

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
                  if (data.success) {
                    markSeatAsBooked(selectedSeatId);
                    purchaseTicketSuccess();
                  } else {
                    purchaseTicketFailure(data.message);
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
                {error ? <p style={{ color: "red" }}>{error}</p> : null}
                <Button color="primary" type="submit">
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

const TicketTable = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: 80%;
  margin: 0 auto;
`;
const TableItem = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 10px;
`;
const ModalInput = styled.form`
  background-color: #eee;
  padding: 20px;
  margin: 30px 0;
`;
const CreditCardContainer = styled.div``;

export default PurchaseModal;
