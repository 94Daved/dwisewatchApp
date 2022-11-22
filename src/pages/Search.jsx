import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { mobile, iPad } from "../utils/responsive";
import { publicRequest } from "../requestResponse";

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  /* ${mobile({ flexDirection: "row" })} */
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await publicRequest.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} search="search" />
      ))}
    </Container>
  );
};

export default Search;
