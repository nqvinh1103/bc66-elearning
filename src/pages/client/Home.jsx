import React from "react";
import styled from "styled-components";
import { Banner } from "./Banner";
import SimpleSlider from "./Carousel";
import Courses from "./Courses";
import { Info } from "./Info";
import { NumberContainer } from "./NumberContainer";

export const Home = () => {
  return (
    <>
      <Container>
        <Banner/>
        <Info/>
        <div className="flex justify-between m-24">
          <h6><a className="font-600 text-yellow-400" href="">Khóa học phổ biến</a></h6>
        </div>
        <Courses/>
        <NumberContainer/>
        <SimpleSlider/>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 100px;
  margin: 20px;
`;
