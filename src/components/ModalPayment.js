import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
    },
    },
}));

const ModalPayment = () => {
    const classes = useStyles();

    return (
    <div className={classes.root}>
        <Form>
            <h2>Enter payments details</h2>
            <InputLine>        
                <TextField id="outlined-basic" label="CreditCard" variant="outlined" />
                <TextField id="outlined-basic" label="Expiration" variant="outlined" />
                <Button variant="contained" color="primary">Purchase</Button>
            </InputLine>
        </Form>

    </div>
    );
}

const Form = styled.form`
`

const InputLine = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-evenly;
`

export default ModalPayment;