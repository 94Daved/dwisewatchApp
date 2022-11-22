import React from "react";
import styled from "styled-components";

const Container = styled.div`
  z-index: 200;
  height: 90vh;
  weight: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 30px;
`;

function NotFound() {
  return <Container>Not Found</Container>;
}

export default NotFound;
