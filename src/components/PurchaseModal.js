import React from "react";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";

//@material-ui
import Dialog from "@material-ui/core/Dialog";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { decodeSeatId } from "../helpers";

const PurchaseModal = () => {
  const {
    state: { price, selectedSeatId, error },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);

  console.log(selectedSeatId);
  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      <Wrapper>
        <Title>
          <strong>Purchase Ticket</strong>
        </Title>
        <div>You are purchasing 1 ticket for the price of ${price}</div>

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
      </Wrapper>
      <PaymentWrapper>
        <PaymentTitle>
          <strong>Enter payment details</strong>
        </PaymentTitle>

        <CreditCardField>
          <TextField
            label="Credit card"
            variant="outlined"
            value={creditCard}
            onChange={(ev) => {
              setCreditCard(ev.target.value);
            }}
          />
        </CreditCardField>
        <ExpirationField>
          <TextField
            label="Expiration"
            variant="outlined"
            value={expiration}
            onChange={(ev) => {
              setExpiration(ev.target.value);
            }}
          />
        </ExpirationField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            purchaseTicketRequest();
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
              .then((res) => {
                if (!res.ok) {
                  purchaseTicketFailure();
                  throw Error("ticketFailure");
                }
                return res.json();
              })
              .then((data) => {
                if (data.success === true) {
                  purchaseTicketSuccess();
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          Purchase
        </Button>
      </PaymentWrapper>
      {error !== null && (
        <div>An unknown error has occured, please try again</div>
      )}
    </Dialog>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  width: 500px;
  margin: 0px;
`;
const Title = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;
const PaymentWrapper = styled.div`
  margin: 0px;
  background: lightgrey;
  padding: 20px;
`;
const PaymentTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CreditCardField = styled.span``;

const ExpirationField = styled.span`
  margin-right: 10px;
  margin-left: 10px;
`;

export default PurchaseModal;
