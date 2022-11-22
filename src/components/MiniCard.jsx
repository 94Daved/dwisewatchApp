import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import millify from "millify";
import Img from "../img/Thina.jpg";
import { publicRequest } from "../requestResponse";
//import Img from "../img/criss.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  flex-direction: row;
  cursor: pointer;
  display: flex;
  width: 100%;
  height: 100px;
  max-width: 350px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(255, 0, 0, 0), #959292);
  border-radius: 5%;
`;

const ImgContainer = styled.div`
  width: 50%;
  width: ${(props) => props.search === "search" && "400px"}
  max-width: 180px;
  margin-right: 8px;
`;

const Details = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  gap: 12px;
`;

const FullTitle = styled.span`
  position: absolute;
  width: fit-content;
  padding: 0 5px;
  font-size: 12px;
  top: -15px;
  left: 0px;
  color: black;
  max-height: 42px;
  max-width: 50ch;
  background-color: #dedebd;
  display: none;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: none;
`;

const Texts = styled.div``;

const TextTitle = styled.div`
  &:hover {
    ${FullTitle} {
      display: block;
    }
  }
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 28ch;
  max-width: ${(props) => props.type === "sm" && "20ch"};
`;

const ChannelName = styled.h2`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
  font-weight: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 22ch;
`;

const Info = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSoft};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20ch;
`;

const MiniCard = ({ video, search }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getChannel = async () => {
      try {
        const res = await publicRequest.get(`users/find/${video?.userId}`);
        setUser(res.data);
      } catch (error) {}
    };

    video?.userId && getChannel();
  }, [video?.userId]);

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container search={search}>
        <ImgContainer search={search}>
          <Image
            //src={Img}
            src={video?.imgUrl}
          />
        </ImgContainer>
        <Details>
          <ChannelImage
            src={
              user?.img ||
              "data:image/png;base64,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"
            }
          />
          <Texts>
            <TextTitle>
              <FullTitle>{video?.title}</FullTitle>
              <Title>{video?.title}</Title>
            </TextTitle>
            <Link
              to={`/channel/${video?.userId}`}
              style={{ textDecoration: "none" }}
            >
              <ChannelName>{user?.name}</ChannelName>
            </Link>
            <Info>
              {millify(video?.views)} views • {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default MiniCard;
