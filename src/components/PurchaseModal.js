import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";

export default function FormDialog(props) {
  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const {
    state,
    actions: {
      purchaseTicketSuccess,
      purchaseTickeFailure,
      receiveSeatInfoFromServer,
      cancelBookingProcess,
    },
  } = React.useContext(BookingContext);

  const { seatList, setSeatList } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    cancelBookingProcess();
  };

  const handleClickTicketPurchase = (data) => {
    console.log("handleClickTicketPurchase: ", data);
    fetch("/api/book-seat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => purchaseTicketSuccess(data))
      .catch((err) => purchaseTickeFailure(err));

    setSeatList(!seatList);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={state.selectedSeatId !== null}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Title id="form-dialog-title">Purchase Ticket</Title>
        <DialogContent>
          <PopUp>
            <DialogContentText>
              You are purchasing 1 ticket for the price of {state.price}
            </DialogContentText>
            <PurchaseTable>
              <tbody>
                <tr>
                  <PurchaseRow>Row</PurchaseRow>
                  <PurchaseRow>Seat</PurchaseRow>
                  <PurchaseRow>Price</PurchaseRow>
                </tr>
                <tr>
                  <PurchaseDiv>{state.row}</PurchaseDiv>
                  <PurchaseDiv>{state.seat}</PurchaseDiv>
                  <PurchaseDiv>{state.price}</PurchaseDiv>
                </tr>
              </tbody>
            </PurchaseTable>
            <ClientInfo>
              <TitleAndForm>
                <ClientInfoTitle>Enter Payment Details</ClientInfoTitle>
                <ClientForm
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleClickTicketPurchase({
                      seatId: state.selectedSeatId,
                      creditCard: creditCard,
                      expiration: expiration,
                    });
                  }}
                >
                  <CreditCardText
                    id="outlined-CreditCard"
                    label="Credit Card"
                    variant="outlined"
                    onChange={(e) => {
                      setCreditCard(e.target.value);
                    }}
                    value={creditCard}
                  />
                  <ExpirationText
                    id="outlined-Expiration"
                    label="Expiration"
                    variant="outlined"
                    onChange={(e) => {
                      setExpiration(e.target.value);
                    }}
                    value={expiration}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Purchase
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </ClientForm>
              </TitleAndForm>
            </ClientInfo>
          </PopUp>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

const PurchaseTable = styled.table`
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

const PurchaseDiv = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const PurchaseRow = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 8px;
`;

const PopUp = styled.div`
  width: 552px;
`;

const TitleAndForm = styled.div``;
const ClientInfoTitle = styled.div`
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 2%;
`;

const ClientForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

const ClientInfo = styled.div`
  position: relative;
  background-color: lightgrey;
  diplay: flex;
  flex-direction: column;
  padding: 24px;
`;
const Title = styled(DialogTitle)`
  font-weight: bold;
`;
const CreditCardText = styled(TextField)``;
const ExpirationText = styled(TextField)`
  width: 100px;
  margin-left: 5%;
`;
