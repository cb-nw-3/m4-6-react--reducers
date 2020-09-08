import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  field: {
    width: 100,
    marginLeft: 24,
    marginRight: 24,
  },
  purchaseBtn: {
    height: 55,
  },
});

const useTextStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const PurchaseModal = () => {
  const {
    state,
    actions: { handleClose, handleStatus, handlePurchase },
  } = React.useContext(BookingContext);
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const { selectedSeatId } = state;
  const seatInfo = selectedSeatId ? selectedSeatId.split("-") : [null, null];
  const classes = useStyles();
  const textClasses = useStyles();

  const purchaseSeat = async () => {
    try {
      const data = await fetch("http://localhost:5678/api/book-seat", {
        method: "POST",
        body: JSON.stringify({
          seatId: selectedSeatId,
          creditCard: creditCard,
          expiration: expiration,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (data.ok) {
        const response = await data.json();
        if (response.success) {
          handlePurchase(state);
        }
      }
    } catch {
      // TODO
    }
  };

  return (
    <Dialog
      open={selectedSeatId !== null}
      onClose={handleClose.bind(null, state)}
    >
      <Modal>
        <SeatInfo>
          <h2>Purchase Ticket</h2>
          <p>
            You're purchasing <strong>1</strong> ticket for the price of $
            {state.price}
          </p>
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
                  <TableCell>{seatInfo[0]}</TableCell>
                  <TableCell>{seatInfo[1]}</TableCell>
                  <TableCell>${state.price}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </SeatInfo>
        <CheckOut>
          <h3>Enter Payment Details</h3>
          <form className={textClasses.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Credit card"
              variant="outlined"
              onChange={(event) => {
                setCreditCard(event.target.value);
              }}
            />
            <TextField
              className={classes.field}
              id="outlined-basic"
              label="Expiration"
              variant="outlined"
              onChange={(event) => {
                setExpiration(event.target.value);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.purchaseBtn}
              onClick={purchaseSeat}
            >
              Purchase
            </Button>
          </form>
        </CheckOut>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={state.status === "purchased"}
        autoHideDuration={6000}
        onClose={handleStatus.bind(null, state)}
        message="Succesfully purchased ticket! Enjoy the show."
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleStatus.bind(null, state)}
            ></IconButton>
          </React.Fragment>
        }
      />
    </Dialog>
  );
};

const Modal = styled.div`
  min-width: 600px;
  height: 400px;
`;

const SeatInfo = styled.div`
  padding: 15px;
`;

const CheckOut = styled.div`
  padding: 15px;
  background: #eee;
`;

export default PurchaseModal;
