import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestResponse";
import { mobile, iPad, semiMonitor } from "../utils/responsive";
import MiniCard from "./MiniCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  ${mobile({ display: "none" })}
  ${iPad({ display: "none" })} /* ${semiMonitor({ display: "none" })} */
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchTagged = async () => {
      try {
        const res = await publicRequest.get(`videos/tags?tags=${tags}`);
        setVideos(res.data);
      } catch (error) {}
    };
    fetchTagged();
  }, [tags]);
  return (
    <Container>
      {videos.map((video) => (
        <MiniCard type="sm" video={video} key={video?._id} />
      ))}
    </Container>
  );
};

export default Recommendation;
