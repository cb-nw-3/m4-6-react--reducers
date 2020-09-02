import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function MaterialButton({
  text,
  width,
  expiration,
  creditCard,
  setCreditCard,
  setExpiration,
}) {
  const classes = useStyles();

  const {
    state: { selectedSeatId },
    actions: {
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const purchaseHandler = async (e) => {
    console.log("event", e);
    e.preventDefault();
    purchaseTicketRequest();

    try {
      const response = await fetch("/api/book-seat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seatId: selectedSeatId,
          creditCard,
          expiration,
        }),
      });
      const data = await response.json();
      if (data.status >= 400) {
        purchaseTicketFailure(data.message);
        throw new Error(data.message);
      } else {
        purchaseTicketSuccess();
        markSeatAsPurchased({ seatId: selectedSeatId });
        setCreditCard("");
        setExpiration("");
      }
    } catch (err) {
      console.log("Error occured:", err);
    }
  };

  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      className={classes.margin}
      style={{ minWidth: `${width}`, marginLeft: "30px" }}
      onClick={purchaseHandler}
    >
      {text}
    </Button>
  );
}
