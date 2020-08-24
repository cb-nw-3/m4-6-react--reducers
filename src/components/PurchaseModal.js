import React from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
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
import { decodeSeatId } from "../helpers";

const PurchaseModal = () => {
  const {
    status,
    error,
    selectedSeatId,
    price,
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      <Title>Purchase ticket</Title>
      <TicketInfo>
        You're purchasing <strong>1</strong> ticket for the price of ${price}.
      </TicketInfo>
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
            <TableCell>{rowName}</TableCell>
            <TableCell>{seatNum}</TableCell>
            <TableCell>${price}</TableCell>
          </TableRow>
        </TableBody>
      </TicketTable>
      <Form
        OnSubmit={(ev) => {
          ev.preventDefault();
          purchaseTicketRequest();

          fetch("/api/book-seat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              creditCard,
              expiration,
              seatId: selectedSeatId,
            }),
          })
            .then((res) => res.json())
            .then((json) => {
              if (json.success) {
                console.log(json.success);
                purchaseTicketSuccess();
                markSeatAsPurchased(selectedSeatId);
              } else {
                purchaseTicketFailure(json.message);
              }
            })
            .catch((err) => {
              console.log(err);
              purchaseTicketFailure("Unknown error occurred!");
            });
        }}
      >
        <FormTitle>Enter payment details</FormTitle>
        <Row>
          <TextField
            variant="outlined"
            label="Credit Card"
            type="text"
            value={creditCard}
            style={{ flex: 2 }}
            onChange={(ev) => setCreditCard(ev.target.value)}
          />
          <TextField
            variant="outlined"
            label="Expiration"
            type="text"
            value={expiration}
            style={{ flex: 1 }}
            onChange={(ev) => setExpiration(ev.target.value)}
          />
          <PurchaseButton variant="contained" color="primary" type="submit">
            {status === "awaiting-response" ? <CircularProgress /> : "Purchase"}
          </PurchaseButton>
        </Row>
        {error && <Error>{error}</Error>}
      </Form>
    </Dialog>
  );
};

const Title = styled.h1`
  margin-left: 30px;
  margin-top: 30px;
`;
const TicketInfo = styled.p`
  margin-bottom: 20px;
  margin-left: 30px;
  margin-top: 20px;
`;
const TicketTable = styled(Table)`
  width: 80% !important;
  margin: 15px auto 30px;
`;
const Form = styled.form`
  padding: 30px;
`;
const FormTitle = styled.h2`
  font-weight: bold;
`;
const Row = styled.div`
  display: flex;
  padding-top: 10px;
`;
const PurchaseButton = styled(Button)`
  color: white;
`;
const Error = styled.div`
  color: red;
  padding: 15px 5px;
`;
export default PurchaseModal;
