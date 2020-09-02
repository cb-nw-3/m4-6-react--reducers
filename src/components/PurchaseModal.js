import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";
import SimpleTable from "./Table";
import CreditCardInput from "./creditCardInput";
import MaterialButton from "./materialButton";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";

export default function FormDialog() {
  const {
    state: { selectedSeatId, price },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  return (
    <Dialog open={selectedSeatId !== null} aria-labelledby="form-dialog-title">
      <Exit>
        <ClearIcon onClick={cancelBookingProcess} />
      </Exit>
      <DialogTitle id="form-dialog-title">Purchase ticket</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You're purchasing <strong>1</strong> ticket for the price of ${price}
        </DialogContentText>
        <SimpleTable seatId={selectedSeatId} price={price} />
      </DialogContent>
      <PaymentDiv>
        <h3>Enter payment details</h3>
        <PaymentInput>
          <CreditCardInput
            placeholder={"Credit Card"}
            width={"100%"}
            value={creditCard}
            state={creditCard}
            setState={setCreditCard}
          />
          <CreditCardInput
            placeholder={"Expiration"}
            width={"100px"}
            value={expiration}
            state={expiration}
            setState={setExpiration}
          />
          <MaterialButton
            text={"PURCHASE"}
            width={"150px"}
            expiration={expiration}
            creditCard={creditCard}
            setExpiration={setExpiration}
            setCreditCard={setCreditCard}
          />
        </PaymentInput>
      </PaymentDiv>
    </Dialog>
  );
}

const PaymentInput = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const PaymentDiv = styled.div`
  width: 100%;
  background: #fbfbfb;
  padding: 20px 40px 0 40px;
`;

const Exit = styled.span`
  margin: 10px;
  display: flex;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;
