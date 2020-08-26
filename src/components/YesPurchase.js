import React from "react";
import styled from "styled-components";

import { BsCheckCircle } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { BookingContext } from "./BookingContext";

const YesPurchase = () => {
  const {
    actions: { cancelBookingProcess },
  } = React.useContext(BookingContext);

  return (
    <StyledContainer>
      <BsCheckCircle style={{ color: "white" }} />
      <StyledP>Successfully purchased ticket! Enjoy el concerto.</StyledP>
      <StyledButton onClick={() => cancelBookingProcess()}>
        <GrClose />
      </StyledButton>
    </StyledContainer>
  );
};

const StyledButton = styled.button`
  background: green;
`;
const StyledP = styled.p`
  margin-left: 5px;
`;
const StyledContainer = styled.div`
  background: green;
  border-radius: 5px;
  color: white;
  display: flex;
  padding: 10px;
  margin-top: 50px;
`;
export default YesPurchase;
