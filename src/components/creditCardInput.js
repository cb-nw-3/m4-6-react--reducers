import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function CreditCardInput({
  placeholder,
  width,
  state,
  setState,
}) {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ maxWidth: `${width}` }}
    >
      <TextField
        id="standard-basic"
        label={placeholder}
        variant="outlined"
        style={{ maxWidth: `${width}` }}
        onChange={(e) => {
          setState(e.target.value);
          console.log(state);
        }}
      />
    </form>
  );
}
