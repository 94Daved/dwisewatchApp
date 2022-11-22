import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { publicRequest } from "../requestResponse";
import {
  mobile,
  iPad,
  semiMonitor,
  normalMonitor,
  bigMonitor,
} from "../utils/responsive";

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  height: calc(100% - 50px);
  color: ${({ theme }) => theme.text};
`;
const Header = styled.div`
  display: flex;
  align-items: flex-end;
  height: 150px;
  background-color: transparent;
`;

const Imgcontainer = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  cursor: pointer;
  background-color: gray;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChannelName = styled.span`
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;
const SubscribeNumber = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
  cursor: pointer;
`;
const Content = styled.div`
  height: calc(100% - 600px);
  width: 300px;

  /* height: 70%; */
  /* width: 100%; */
`;

const Channel = () => {
  const path = useLocation().pathname.split("/")[2];
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getChannel = async () => {
      try {
        const res = await publicRequest.get(`users/find/${path}`);
        setUser(res.data);
      } catch (error) {}
    };

    path && getChannel();
  }, [path]);

  useEffect(() => {
    const getChannelVideo = async () => {
      const res = await publicRequest.get(`videos/all/${path}`);
      setVideos(res.data);
      try {
      } catch (error) {}
    };

    path && getChannelVideo();
  }, [path]);

  return (
    <Container>
      <Header>
        <Imgcontainer>
          <Img src={user?.img} />
          <Details>
            <ChannelName>{user?.name}</ChannelName>
            <SubscribeNumber>{user?.subscribers} Subscribers</SubscribeNumber>
          </Details>
        </Imgcontainer>
      </Header>
      <Hr />
      <Content>
        {videos.map((video) => (
          <Card
            key={video._id}
            video={video}
            search="channel"
            owner={user?._id === currentUser?._id ? true : false}
          />
        ))}
      </Content>
    </Container>
  );
};

export default Channel;
