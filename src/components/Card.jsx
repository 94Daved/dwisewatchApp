import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Img from "../img/Thina.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "0px")};
  flex-direction: ${(props) => props.type === "sm" && "row"};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  max-height: 300px;
`;

const Image = styled.img`
  width: 100%;
  flex: 1;
  height: ${(props) => props.type === "sm" && "120px"};
  min-height: ${(props) => (props.type === "sm" ? "120px" : "180px")};
  background-color: #999;
  margin-right: ${(props) => props.type === "sm" && "10px"};
  object-fit: cover;
`;

const Details = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type }) => {
  return (
    <Link to="/video/test" style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image
          type={type}
          src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2FtcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          // src={Img}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src="https://www.adobe.com/express/discover/templates/media_11bf9113e7353979b36aef9eea5f540f489148f20.jpeg?width=400&format=webply&optimize=medium"
          />
          <Texts>
            <Title>Linear Algebra</Title>
            <ChannelName>dWise TechdWise Tech</ChannelName>
            <Info>660,908 views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
