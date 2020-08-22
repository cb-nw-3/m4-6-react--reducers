import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    //returns the currently selected seat information before
    //booking that activates modal
    case "begin-booking-process": {
      const results = {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatId,
        price: action.price,
      };
      console.log("the results are stored as:", results);
      return results;
    }

    //reset states if current modal has been exited
    case "cancel-booking-process": {
      const results = {
        ...state,
        status: "idle",
        selectedSeatId: null,
        price: null,
      };
      console.log("the results are stored as:", results);
      return results;
    }

    //if seat request is submitted on the modal then  await results
    //and reset states
    case "purchase-ticket-request": {
      const results = {
        ...state,
        status: "awaiting-response",
        error: null,
        price: null,
      };
      console.log("the results are stored as:", results);
      return results;
    }

    //render message when unable to buy a ticket
    case "purchase-ticket-failure": {
      const results = {
        ...state,
        status: "error",
        error: action.message,
      };
      console.log("the results are stored as:", results);
      return results;
    }

    //set the state of the seat to purchased, renders the seat unavailable
    case "purchase-ticket-success": {
      const results = {
        ...state,
        status: "purchased",
        selectedSeatId: null,
        price: null,
        error: null,
      };
      console.log("the results are stored as:", results);
      return results;
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = React.useCallback(
    ({ seatId, price }) => {
      dispatch({ type: "begin-booking-process", seatId, price });
    },
    [dispatch]
  );

  const cancelBookingProcess = React.useCallback(() => {
    dispatch({ type: "cancel-booking-process" });
  }, [dispatch]);

  const purchaseTicketRequest = React.useCallback(() => {
    dispatch({ type: "purchase-ticket-request" });
  }, [dispatch]);

  const purchaseTicketFailure = React.useCallback(
    (message) => {
      dispatch({ type: "purchase-ticket-failure", message });
    },
    [dispatch]
  );

  const purchaseTicketSuccess = React.useCallback(() => {
    dispatch({ type: "purchase-ticket-success" });
  }, [dispatch]);

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketFailure,
          purchaseTicketSuccess,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
