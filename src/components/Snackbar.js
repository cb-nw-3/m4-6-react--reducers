import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { BookingContext } from "./BookingContext";

export default function SimpleSnackbar() {
  const {
    actions: { setBackToIdle },
  } = React.useContext(BookingContext);

  const handleClose = () => {
    setBackToIdle();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Successfully purchased ticket! Enjoy the show."
        action={
          <React.Fragment>
            <IconButton size="medium" aria-label="close" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
