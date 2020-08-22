import React from "react";
import styled from "styled-components";
import { Dialog } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, price },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

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

export default PurchaseModal;
