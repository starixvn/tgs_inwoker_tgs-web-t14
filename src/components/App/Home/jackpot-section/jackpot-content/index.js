// JackpotContainer.js

import React from "react";
import Winners from "../winners";
import styled from "styled-components";

const JackpotContentWorkingSpace = styled.div`
  width: 1280px;
  height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  margin: 0 auto;
`;

const BannerContainer = styled.div`
padding: 10px;
background: #252958;
border-radius: 5px;
`;

const JackpotContainer = () => (
  <JackpotContentWorkingSpace>
    <BannerContainer>
      <img
        style={{ height: "330px" }}
        alt="banners"
        src={process.env.PUBLIC_URL + "/assets/images/pcHomePage/startplay.png"}
      />
    </BannerContainer>
    <Winners />
  </JackpotContentWorkingSpace>
);

export default JackpotContainer;