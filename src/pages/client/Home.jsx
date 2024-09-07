import React from "react";
import styled from "styled-components";
import { Banner } from "./Banner";
import { Info } from "./Info";

export const Home = () => {
  return (
    <>
      <Container>
        <Banner/>
        <Info/>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 100px;
`;
