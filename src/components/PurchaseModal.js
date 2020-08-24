import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SimpleTable from "./SimpleTable";

import { makeStyles } from "@material-ui/core/styles";

import { BookingContext } from "./BookingContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const PurchaseModal = (props) => {
  const { state } = React.useContext(BookingContext);
  const {
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);
  const classes = useStyles();

  const price = state.price;

  const [creditCard, setCreditCard] = React.useState("");

  const [expiration, setExpiration] = React.useState("");

  const handleClose = () => {
    cancelBookingProcess();
  };

  const handleClick = (e) => {
    e.preventDefault();
    purchaseTicketRequest();

    fetch("/api/book-seat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seatId: state.seatId, creditCard, expiration }),
    })
      .then((response) => response.json())
      .then((data) => {
        purchaseTicketSuccess({ ...data, creditCard, expiration });

        setCreditCard("");
        setExpiration("");
      })
      .catch((error) => {
        purchaseTicketFailure(error);
        console.error("Error:", error);
      });
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={state.selectedSeatId !== null}
    >
      <h1 style={{ padding: "27px 0 10px 27px" }}>Purchase ticket</h1>
      <p style={{ padding: "27px 0 10px 27px" }}>
        You're purchasing <span style={{ fontWeight: "bold" }}>1</span> ticket
        for the price of ${price}.
      </p>
      <SimpleTable price={price} seatId={state.selectedSeatId} />
      <h3 style={{ padding: "27px 0 0 27px", background: "gainsboro" }}>
        Enter payment details
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          background: "gainsboro",
          paddingBottom: "60px",
        }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Credit Card"
            variant="outlined"
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Expiration"
            variant="outlined"
            onChange={(e) => setExpiration(e.target.value)}
            style={{ width: "100px" }}
          />
        </form>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ height: "55px" }}
          >
            Purchase
          </Button>
        </div>
      </div>
      <div style={{ height: "55px" }}></div>

      {console.log(state.error)}
      {state.error !== null ? (
        <div style={{ color: "red" }}>{state.error}</div>
      ) : null}
    </Dialog>
  );
};

export default PurchaseModal;
