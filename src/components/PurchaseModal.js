import React from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

//STUFF THAT I IMPORTED FROM THE PROJECT
import { decodeSeatId } from "../helpers";
import { BookingContext } from "./BookingContext";
import { SeatContext } from "./SeatProvider";

const PurchaseModal = () => {
  //STATES
  const {
    state: { selectedSeatId, price },
    actions: {
      cancelBookingProcess,
      purchaseTicketRequest,
      purchaseTicketFailure,
      purchaseTicketSuccess,
    },
  } = React.useContext(BookingContext);

  const {
    actions: { markedSeatAsPurchased },
  } = React.useContext(SeatContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  function submitRequest() {
    try {
      const url = "/api/book-seat";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          seatId: selectedSeatId,
          creditCard: creditCard,
          expiration: expiration,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        // .then((data) => console.log(data))
        .then((json) => {
          if (json.success) {
            purchaseTicketSuccess();
            markedSeatAsPurchased(selectedSeatId);
          } else {
            purchaseTicketFailure(json.message);
          }
        });
    } catch (error) {
      console.log("Unable to complete request. Error: ", error);
      purchaseTicketFailure("Ticket Purchase Failed!");
    }
  }

  //FORM SUBMISSION
  function handleSubmit(ev) {
    ev.preventDefault();

    //updates state of booking provider
    purchaseTicketRequest();

    //send POST request
    submitRequest();

    //reset the fields of the modal form
    setCreditCard("");
    setExpiration("");

    // window.alert("Form has been Submited!");
  }

  const { rowName, seatNum } = decodeSeatId(selectedSeatId);
  return (
    <Wrapper>
      <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
        <ModalTopBar>
          <Button onClick={cancelBookingProcess}>
            <CloseIcon />
          </Button>
        </ModalTopBar>
        <ModalTitle>Purchase ticket</ModalTitle>
        <ModalText>
          You're purchasing <strong>1</strong> ticket for the price of ${price}.
        </ModalText>

        <ModalTable>
          <TableContainer justify="center">
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
                <TableCell>{price}</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </ModalTable>
        <FormContainer>
          <ModalTitle>Enter Payment Details</ModalTitle>
          <ModalForm onSubmit={handleSubmit}>
            <TextField
              style={{ flex: 2 }}
              type="text"
              label="Credit Card"
              variant="outlined"
              value={creditCard}
              onChange={(ev) => setCreditCard(ev.currentTarget.value)}
              required
            />
            <Spacer />
            <TextField
              style={{ flex: 1 }}
              type="text"
              label="Expiration"
              variant="outlined"
              value={expiration}
              onChange={(ev) => setExpiration(ev.currentTarget.value)}
              required
            />
            <Spacer />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </ModalForm>
        </FormContainer>
      </Dialog>
    </Wrapper>
  );
};

const FormContainer = styled.div`
  padding: 30px 0;
  margin: 20px 0;
  background: lightgray;
`;

const Spacer = styled.div`
  width: 20px;
`;

const ModalForm = styled.form`
  /* height: 500px; */
  margin: 30px;
  display: flex;
  justify-content: space-between;
`;

const ModalTopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
`;

const ModalTable = styled.div`
  margin: 10px auto;
`;

const ModalTitle = styled.h1`
  margin: 5px 20px;
`;

const ModalText = styled.p`
  margin: 8px 20px;
`;

const Wrapper = styled.div`
  width: 80vw;
  background-color: pink;
`;

export default PurchaseModal;
