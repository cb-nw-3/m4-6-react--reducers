import React from "react";
import styled from "styled-components";

//The tooltip format was taken from this code snippet
//https://codesandbox.io/s/0y6pj161wp?file=/src/index.js:99-218

//Any element wrapped with <Tippy></Tippy> will have a tooltip

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";
import "tippy.js/animations/scale-subtle.css";

import seatSrc from "../assets/seat-available.svg";
import UnstyledButton from "./UnstyledButton";

const Seat = (props) => {
  return (
    <Tippy
      content={`Seat: ${props.rowName}-${props.seatNum}, Cost: $${props.price}`}
      placement="bottom"
      animation="scale-subtle"
      theme="material"
      arrow={false}
      duration={200}
      delay={[75, 0]}
      distance={8}
    >
      <Wrapper disabled={props.isBooked}>
        <img alt="seat" src={seatSrc} />
      </Wrapper>
    </Tippy>
  );
};

const Wrapper = styled(UnstyledButton)`
  position: relative;

  &:disabled img {
    filter: grayscale(100%);
  }
`;
export default Seat;
