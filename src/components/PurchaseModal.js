import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
// import PersonIcon from "@material-ui/icons/Person";
// import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId },
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
      <h1>Selected Seat: {selectedSeatId}</h1>
      <button onClick={cancelBookingProcess}>Close</button>
    </Dialog>
  );
};

export default PurchaseModal;
