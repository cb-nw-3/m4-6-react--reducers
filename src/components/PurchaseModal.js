import React, { useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { decodeSeatId } from "../helpers";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

const PurchaseModal = ({ open }) => {
  const {
    selectedSeatId,
    status,
    error,
    price,
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketSuccess,
      purchaseTicketFailure,
    },
  } = useContext(BookingContext);

  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const classes = useStyles();

  const currentSelectedSeat = decodeSeatId(selectedSeatId);

  return (
    <Dialog
      key={`${selectedSeatId}-modal`}
      open={open}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are purchasing <b>1</b> ticket for {selectedSeatId} seat, for the
          price of ${price}.
        </DialogContentText>
      </DialogContent>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Row</TableCell>
              <TableCell align="right">Seat</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={"Line 1"}>
              <TableCell align="right">{currentSelectedSeat.rowName}</TableCell>
              <TableCell align="right">{currentSelectedSeat.seatNum}</TableCell>
              <TableCell align="right">{`$${price}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <h2>Enter Payment details</h2>
        <TextField
          id="credit-card-input"
          label="Credit Card"
          variant="outlined"
          onChange={(e) => setCreditCard(e.currentTarget.value)}
        />
        <TextField
          id="expiration-input"
          label="Expiration"
          variant="outlined"
          onChange={(e) => setExpiration(e.currentTarget.value)}
        />
      </div>
      <div>{error}</div>
      <div>{status}</div>
      <DialogActions>
        <Button
          color="primary"
          onClick={(e) => {
            purchaseTicketRequest();
            console.log(
              "BEFORE POSTING ==>",
              selectedSeatId,
              creditCard,
              expiration
            );
            postTransaction({
              seatId: selectedSeatId,
              creditCard,
              expiration,
            })
              .then((data) => {
                console.log("THEN==>", data);
                if (data.status === 200) {
                  purchaseTicketSuccess();
                  setCreditCard("");
                  setExpiration("");
                } else {
                  purchaseTicketFailure({ error: data.message });
                }
              })
              .catch((err) => {
                console.log("ERROR==>", err);
              });
          }}
        >
          Purchase
        </Button>
        <Button color="primary" onClick={cancelBookingProcess}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const postTransaction = async ({ seatId, creditCard, expiration }) => {
  const response = await fetch("api/book-seat", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({ seatId, creditCard, expiration }),
  });
  return response.json();
};
export default PurchaseModal;
