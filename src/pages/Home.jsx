import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { publicRequest } from "../requestResponse";

import {
  mobile,
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
  ${mobile({ gridTemplateColumns: " 1fr ", rowGap: "30px" })}
  ${iPad({ gridTemplateColumns: "1fr 1fr ", rowGap: "30px" })}
  ${semiMonitor({ gridTemplateColumns: "1fr 1fr 1fr", rowGap: "60px" })}
  ${normalMonitor({ gridTemplateColumns: "1fr 1fr 1fr 1fr", rowGap: "60px" })}
  ${bigMonitor({ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", rowGap: "60px" })}
  column-gap: 15px;
`;

const CardContainer = styled.div``;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await publicRequest.get(`/videos/${type}`);
        setVideos(res.data);
      } catch (error) {}
    };

    getVideos();
  }, [type]);

  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
