import React from "react";
import styled from "styled-components";
import IconWithdrawRedPNG from "../../../../../../assets/images/icon-withdraw.png";
import PopupAnnouncement from "../../../../Home/PopupAnnouncement";
import Loading from "../../../../Loading";
import i18n from "../../../../../../utils/i18n";
import { TitleIcon } from "../../../components";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  min-height: 611px; 
  background-color: ${({ theme }) => {
    return theme.customProfileBackground100
      ? theme.customProfileBackground100
      : "#eaeaea";
  }};

`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;

const InnerWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#f7f7f7";
  }};

  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

const Template1 = ({
  openAnnouncement,
  loading,
  handleCloseAnnouncement,
  switchDisplayView,
}) => {
  return (
    <Container>
      <PopupAnnouncement
        open={openAnnouncement}
        onClose={() => {
          handleCloseAnnouncement();
        }}
        text={i18n.t("card.toEdit")}
      ></PopupAnnouncement>
      <Title>
        <TitleIcon src={IconWithdrawRedPNG} />
        {i18n.t("withdrawal.title")}
      </Title>
      <InnerWrap>
        {switchDisplayView()}
        <Loading show={loading}></Loading>
      </InnerWrap>
    </Container>
  );
};

export default Template1;
