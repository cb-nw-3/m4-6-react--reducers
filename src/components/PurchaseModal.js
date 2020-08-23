import React from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);
  const classes = useStyles();

  const handleClose = () => {
    cancelBookingProcess();
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
        for the price of ${state.price}
      </p>
      <h3 style={{ padding: "0 0 0 27px", background: "gainsboro" }}>
        Enter payment details
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "20px",
          background: "gainsboro",
        }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Credit Card"
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Expiration"
            variant="outlined"
            style={{ width: "100px" }}
          />
        </form>
        <div className={classes.button}>
          <Button
            variant="contained"
            color="primary"
            style={{ height: "55px" }}
          >
            Purchase
          </Button>
        </div>
      </div>
      <div style={{ height: "55px" }}></div>
    </Dialog>
  );
};

export default PurchaseModal;
