import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { Link } from "react-router-dom";
import { mobile } from "../utils/responsive";

const Container = styled.div`
  ${mobile({ display: "none" })}
  flex: 1;
  padding: 0 2px;
  margin-top: 56px;
  background-color: ${({ theme }) => theme.bg};
  min-height: calc(100% - 58px);
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.soft};
  border-right: none;
  position: fixed;
`;

const Wrapper = styled.div``;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  gap: 5px;
  cursor: pointer;
  padding: 9px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <Wrapper>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscribe
        </Item>
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Sidebar;
