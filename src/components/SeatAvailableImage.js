//Libaries
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";

// Assets
import seatAvailableImg from "../assets/seat-available.svg";

// Styles
import styled from "styled-components";

const seatAvailableImage = (props) => {
  return (
    <Tippy
      content={`Seat: ${props.rowName}-${props.seatNum}, Cost: $${props.price}`}
    >
      <Wrapper disabled={props.isBooked}>
        <Button>
          <img src={seatAvailableImg} alt="Seat is Available" />
        </Button>
      </Wrapper>
    </Tippy>
  );
};

const Wrapper = styled.button`
  display: ${(props) => props.display || "block"};
  border: none;
  background: transparent;
  &:disabled img {
    filter: grayscale(100%);
  }
`;

const Button = styled.button`
  border: none;
`;

export default seatAvailableImage;
