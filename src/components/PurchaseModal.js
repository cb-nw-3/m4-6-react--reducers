import React from "react";
import styled from "styled-components";
import { BookingContext } from "./BookingContext";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

const PurchaseModal = () => {
  const {
    state: { price, selectedSeatId },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  const [creditCardInfo, setCreditCardInfo] = React.useState("");
  const [expiration, setExpiration] = React.useState("");

  console.log(selectedSeatId);
  return (
    <StyledDialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
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
                <TableCell>
                  {selectedSeatId && selectedSeatId.split("-")[0]}
                </TableCell>
                <TableCell>
                  {selectedSeatId && selectedSeatId.split("-")[1]}
                </TableCell>
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
              value={creditCardInfo}
              onChange={(ev) => {
                setCreditCardInfo(ev.target.value);
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
          <Button variant="contained" color="primary">
            Purchase
          </Button>
        </ButtonField>
      </PaymentWrapper>
    </StyledDialog>
  );
};

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  padding: 30px;
`;

const StyledDialog = styled(Dialog)``;

const Description = styled.p``;

const TableWrapper = styled.div`
  max-width: 60%;
  margin: 0 auto;
`;

const PaymentWrapper = styled.div`
  background: lightgrey;
  padding: 30px;
  margin-bottom: 10px;
`;

const PaymentTitle = styled.h2`
  font-size: 1.3em;
  margin: 10px 0;
`;

const ButtonField = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomTextField = styled.div`
  margin-right: 10px;
`;

const CustomTextField2 = styled.div`
  margin-right: 10px;
  width: 30%;
`;
export default PurchaseModal;
