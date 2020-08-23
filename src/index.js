import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { SeatProvider } from "./components/SeatContext";
import { BookingContextProvider } from "./components/BookingContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <SeatProvider>
    <BookingContextProvider>
      <App />
    </BookingContextProvider>
  </SeatProvider>,
  rootElement
);
