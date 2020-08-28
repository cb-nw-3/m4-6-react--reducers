import React from "react";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";

//@material-ui
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
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
        <Title>Purchase Ticket</Title>
        <Description>
          You are purchasing 1 ticket for the price of ${price}
        </Description>
        <TableWrapper>
          <Table>
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
          </Table>
        </TableWrapper>
      </Wrapper>
      <PaymentWrapper>
        <PaymentTitle>Enter payment details</PaymentTitle>
        <ButtonField>
          <CustomTextField>
            <TextField
              label="Credit card"
              variant="outlined"
              value={creditCard}
              onChange={(ev) => {
                setCreditCard(ev.target.value);
              }}
            />
          </CustomTextField>
          <CustomTextField2>
            <TextField
              label="Expiration"
              variant="outlined"
              value={expiration}
              onChange={(ev) => {
                setExpiration(ev.target.value);
              }}
            />
          </CustomTextField2>
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
        </ButtonField>
      </PaymentWrapper>
      {error !== null && (
        <div>An unknown error has occured, please try again</div>
      )}
    </Dialog>
  );
};

const Wrapper = styled.div``;
const Title = styled.div``;
const PaymentWrapper = styled.div``;
const PaymentTitle = styled.div``;
const ButtonField = styled.div``;
const CustomTextField = styled.div``;

const CustomTextField2 = styled.div``;

const Description = styled.div``;
const TableWrapper = styled.div``;

export default PurchaseModal;
