import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { mobile, iPad, semiMonitor } from "../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { publicRequest } from "../requestResponse";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  likes,
  dislikes,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";
import millify from "millify";

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  gap: 24px;
  width: 100%;
  max-width: 3000px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column", alignItems: "flex-start" })}
  ${iPad({ flexDirection: "column", alignItems: "flex-start" })}
  ${semiMonitor({ flexDirection: "column", alignItems: "flex-start" })}
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  ${mobile({ marginBottom: "10px" })}
  ${iPad({ marginBottom: "10px" })}
  margin-bottom: 10px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;

  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  padding-left: 70px;
  color: ${({ theme }) => theme.text};
`;

const Subscribe = styled.button`
  background-color: ${({ theme }) => theme.bgSearchButton};
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 10px;
  height: max-content;
  padding: 5px 10px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
const Video = () => {
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/")[2];
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const getVideos = async () => {
      dispatch(fetchStart());
      try {
        const videoRes = await publicRequest.get(`/videos/find/${location}`);
        setVideo(videoRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        dispatch(fetchFailure());
      }
    };

    getVideos();
  }, [location, dispatch]);

  useEffect(() => {
    const getChannel = async () => {
      try {
        const channelRes = await publicRequest.get(
          `/users/find/${video?.userId}`
        );
        setChannel(channelRes.data);
      } catch (error) {}
    };
    getChannel();
  }, [video]);

  const handlePlay = async () => {
    try {
      await publicRequest.post(`/videos/view/${currentVideo?._id}`);
    } catch (error) {}
  };
  const handleLike = async () => {
    try {
      await publicRequest.post(`users/like/${currentVideo?._id}`);
      console.log("liked");
      dispatch(likes(currentUser._id));
    } catch (error) {}
  };

  const handleDislike = async () => {
    try {
      await publicRequest.post(`users/dislike/${currentVideo?._id}`);
      dispatch(dislikes(currentUser._id));
      console.log("unliked");
    } catch (error) {}
  };

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await publicRequest.put(`/users/unsub/${channel._id}`)
      : await publicRequest.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  //TODO; Delete video functionality
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo?.videoUrl}
            controls
            autoPlay
            onPlay={handlePlay}
          />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {millify(currentVideo?.views)} views •{" "}
            {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <Link
            to={`/channel/${currentVideo?.userId}`}
            style={{ textDecoration: "none" }}
          >
            <ChannelInfo>
              <Image src={channel?.img} />
              <ChannelDetail>
                <ChannelName>{channel?.name}</ChannelName>
                <ChannelCounter>
                  {channel?.subscribers} subscribers
                </ChannelCounter>
              </ChannelDetail>
            </ChannelInfo>
          </Link>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Description>{currentVideo?.desc}</Description>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
