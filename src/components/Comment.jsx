import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { publicRequest } from "../requestResponse";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  position: relative;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
  flex: 1;
`;

const Text = styled.span`
  font-size: 14px;
`;

const MoreOptions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const buttonIconStyle = {
  color: "inherit",
  fontSize: 20,
  height: 20,
  cursor: "pointer",
};

const OptionList = styled.div`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 5px;
  right: 5%;
  top: 0px;
`;

const OptionListItem = styled.span`
  margin-bottom: 5px;
  color: inherit;
  background-color: ${({ theme }) => theme.bgSearchButton};
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const ImgWrapper = styled.div``;

const Comment = (comment) => {
  const [user, setUser] = useState({});
  const [openOption, setOpenOption] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await publicRequest.get(
          `/users/find/${comment.comment.userId}`
        );
        setUser(res.data);
      } catch (err) {}
    };
    fetchUser();
  }, [comment.comment.userId]);

  const handleDeleteComment = async () => {
    setOpenOption(!openOption);
    try {
      await publicRequest.delete(`/comments/${comment.comment._id}`);
    } catch (err) {}
  };

  return (
    <Container>
      <ImgWrapper>
        <Avatar src={user.img} />
      </ImgWrapper>
      <Details>
        <Name>
          {user.name}
          <Date>{format(comment.comment?.createdAt)}</Date>
          <MoreOptions>
            <MoreHorizIcon
              style={buttonIconStyle}
              onClick={() => setOpenOption(!openOption)}
            />
            {openOption && (
              <OptionList>
                {currentUser._id === comment.comment.userId && (
                  <OptionListItem onClick={handleDeleteComment}>
                    Delete
                  </OptionListItem>
                )}
              </OptionList>
            )}
          </MoreOptions>
        </Name>
        <Text>{comment.comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
