import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { publicRequest } from "../requestResponse";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 60%;
  object-fit: cover;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 5;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  /* width: 100%; */
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.bgSearchButton};
  border: none;
  color: ${({ theme }) => theme.text};
  border-radius: 5px;
  cursor: pointer;
`;

const ClearComment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await publicRequest.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleComment = async () => {
    try {
      const res = await publicRequest.post(`/comments/`, {
        desc: textComment,
        videoId: videoId,
      });
      setTextComment("");
    } catch (error) {}
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input
          placeholder="Add a comment..."
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
          maxLength={200}
        />
        <ClearComment onClick={() => setTextComment("")}>X</ClearComment>
        <Button
          onClick={handleComment}
          disabled={textComment.length > 0 ? false : true}
        >
          Add
        </Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment?._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
