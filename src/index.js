import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import SeatProvider from "./components/SeatProvider";
import BookingProvider from "./components/BookingContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <BookingProvider>
    <SeatProvider>
      <App />
    </SeatProvider>
  </BookingProvider>,
  rootElement
);
