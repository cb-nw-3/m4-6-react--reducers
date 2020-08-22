import React from "react";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price, status },
    actions: {
      cancelBookingProcess,
      requestPurchaseTicket,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  let ticketRow = "";
  let seatNumber = "";

  if (selectedSeatId) {
    ticketRow = selectedSeatId.split("-")[0];
    seatNumber = selectedSeatId.split("-")[1];
  }

  return (
    <Dialog
      open={selectedSeatId !== null}
      onClose={cancelBookingProcess}
      maxWidth="sm"
      fullWidth={true}
    >
      <Title>Purchase ticket</Title>
      <Text>
        You're purchasing <strong>1</strong> ticket for the price of ${price}
      </Text>
      <TicketTable>
        <TableHead>
          <TableRow>
            <TableCell>Row</TableCell>
            <TableCell>Seat</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{ticketRow}</TableCell>
            <TableCell>{seatNumber}</TableCell>
            <TableCell>${price}</TableCell>
          </TableRow>
        </TableBody>
      </TicketTable>
      <Form
        onSubmit={(ev) => {
          ev.preventDefault();
          requestPurchaseTicket();
          setErrorMessage("");
          fetch("/api/book-seat", {
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
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                purchaseTicketSuccess();
                markSeatAsPurchased({ seatId: selectedSeatId });
              } else {
                console.log(data);
                setErrorMessage(data.message);
                purchaseTicketFailure(data);
              }
            });
        }}
      >
        <PaymentTitle>Enter payment details</PaymentTitle>
        <Input
          id="creditCard"
          placeholder="Credit Card"
          variant="outlined"
          onChange={(ev) => {
            setCreditCard(ev.target.value);
          }}
        />
        <Input
          id="expiration"
          placeholder="Expiration"
          variant="outlined"
          onChange={(ev) => {
            setExpiration(ev.target.value);
          }}
        />
        <PurchaseButton size="medium" variant="contained" type="submit">
          {status === "awaiting-response" ? <CircularProgress /> : "PURCHASE"}
        </PurchaseButton>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Dialog>
  );
};

const Title = styled.h2`
  margin: 40px 30px 15px;
`;

const Text = styled.p`
  margin-left: 30px;
`;

const TicketTable = styled(Table)`
  margin: 0 auto;
  width: 80%;
  margin-bottom: 50px;
`;
const Form = styled.form`
  padding: 40px 30px;
  background-color: lightgrey;
`;

const PaymentTitle = styled.h3`
  margin-bottom: 20px;
`;

const Input = styled(TextField)`
  margin-right: 15px;
`;

const PurchaseButton = styled(Button)`
  height: 55px;
  background-color: hsl(256deg, 100%, 44%);
  color: white;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin: 15px 0px;
`;

export default PurchaseModal;
