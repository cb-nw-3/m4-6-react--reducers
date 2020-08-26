import React, { useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import MuiAlert from "@material-ui/lab/Alert";

import { decodeSeatId } from "../helpers";
import { COLORS } from "../theme";
import { Container } from "@material-ui/core";

import styled from "styled-components";

const useStyles = makeStyles({
  table: {
    width: "60%",
    margin: "0 auto",
  },
  title: {
    fontSize: 30,
    fontWeight: 900,
    color: COLORS.secondary,
    fontStyle: "italic",
  },
  container: {
    backgroundColor: COLORS.line,
    padding: "20px",
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
  const classes = useStyles();

  const currentSelectedSeat = decodeSeatId(selectedSeatId);

  return (
    <Dialog
      key={`${selectedSeatId}-modal`}
      open={open}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        disableTypography
        className={classes.title}
        id="form-dialog-title"
      >
        Purchase ticket
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are purchasing <b>1</b> ticket for {selectedSeatId} seat, for the
          price of ${price}.
        </DialogContentText>
      </DialogContent>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Row</TableCell>
              <TableCell align="center">Seat</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={"Line 1"}>
              <TableCell align="center">
                {currentSelectedSeat.rowName}
              </TableCell>
              <TableCell align="center">
                {currentSelectedSeat.seatNum}
              </TableCell>
              <TableCell align="center">{`$${price}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Container className={classes.container}>
        <H2>Enter Payment details</H2>
        <DialogActions>
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
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => {
              purchaseTicketRequest();
              postTransaction({
                seatId: selectedSeatId,
                creditCard,
                expiration,
              })
                .then((data) => {
                  if (data.status === 200) {
                    purchaseTicketSuccess();
                    setCreditCard("");
                    setExpiration("");
                  } else {
                    console.log("MESSAGE FROM POSTIN TX ==>", data);
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
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelBookingProcess}
          >
            Cancel
          </Button>
        </DialogActions>
      </Container>
      {
        {
          "seat-selected": (
            <Alert severity="info">Please complete the form</Alert>
          ),
          error: <Alert severity="error">{error}</Alert>,
          "awaiting-response": (
            <Alert severity="info">Sending Transaction</Alert>
          ),
        }[status]
      }
    </Dialog>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

const H2 = styled.h2`
  font-size: 1.1rem;
  padding-bottom: 6px;
`;
export default PurchaseModal;
