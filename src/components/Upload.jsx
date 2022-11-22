import React, { useState } from "react";
import styled from "styled-components";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { publicRequest } from "../requestResponse";
import { useNavigate } from "react-router-dom";
import {
  mobile,
  bigMonitor,
  semiMonitor,
  normalMonitor,
  iPad,
} from "../utils/responsive";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  ${mobile({ width: "300px", height: "500px" })}
  ${iPad({ width: "300px", height: "500px" })}
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  resize: none;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Form = styled.form``;

const Upload = ({ setOpen, setHideEdit, edit, videoToUpdate }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState({});
  const [imgProgress, setImgProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const navigate = useNavigate();

  const handleText = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    const tagSplit = e.target.value.split(",");
    const tagArray = tagSplit.map((tag) => tag.trim());
    setTags(tagArray);
  };

  const fileUploader = async (file, type) => {
    const name = Date.now() + file.name;

    const storageRef = ref(storage, `${type}/${name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        type === "imgUrl"
          ? setImgProgress(progress)
          : setVideoProgress(progress);
      },
      (error) => {
        //Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInput((prev) => ({ ...prev, [type]: downloadURL }));
        });
      }
    );
  };

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    file && fileUploader(file, type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = {};
      if (edit) {
        res = await publicRequest.put(`videos/${videoToUpdate._id}`, {
          ...input,
          tags,
        });
      } else {
        res = await publicRequest.post(`videos`, { ...input, tags });
      }
      if (edit) {
        setHideEdit(false);
      } else {
        setOpen(false);
        navigate(`/videos/${res.data._id}`);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Close
            onClick={() => {
              if (edit) {
                setHideEdit(false);
              } else {
                setOpen(false);
              }
            }}
          >
            X
          </Close>
          <Title>{edit ? "Update the Video" : "Upload a new Video"}</Title>
          <Label>Video:</Label>
          {videoProgress > 0 ? (
            "Uploading: " + videoProgress + "%"
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => handleFile(e, "videoUrl")}
              required
            />
          )}
          <Input
            name="title"
            type="text"
            placeholder="Tile"
            maxLength={70}
            onChange={(e) => handleText(e)}
            required
          />
          <Desc
            name="desc"
            type="text"
            placeholder="Description"
            rows={5}
            maxLength={300}
            onChange={(e) => handleText(e)}
            required
          />
          <Input
            type="text"
            placeholder="Seperate the tags with commas."
            maxLength={120}
            onChange={(e) => handleTags(e)}
            required
          />
          <Label>Image:</Label>
          {imgProgress > 0 ? (
            "Uploading: " + imgProgress + "%"
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, "imgUrl")}
              required
            />
          )}
          <Button>{edit ? "Update" : "Upload a new Video"}</Button>
        </Wrapper>
      </Form>
    </Container>
  );
};

export default Upload;
