import React from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {
  bigMonitor,
  semiMonitor,
  normalMonitor,
  iPad,
} from "../utils/responsive";

const Container = styled.div`
  display: grid;
  margin-top: 56px;
  justify-content: space-between;
  max-width: 3000px;
  ${iPad({ gridTemplateColumns: "1fr 1fr ", rowGap: "45px" })}
  ${semiMonitor({ gridTemplateColumns: "1fr 1fr 1fr", rowGap: "45px" })}
  ${normalMonitor({ gridTemplateColumns: "1fr 1fr 1fr 1fr", rowGap: "45px" })}
  ${bigMonitor({ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", rowGap: "45px" })}
  column-gap: 15px;
  row-gap: 35px;
`;

const CardContainer = styled.div``;

const Home = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <CardContainer></CardContainer>
    </Container>
  );
};

export default Home;
