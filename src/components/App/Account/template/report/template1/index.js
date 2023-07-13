import React from "react";
import styled from "styled-components";
import IconReportRedPNG from "../../../../../../assets/images/icon-report.png";
import i18n from "../../../../../../utils/i18n";
import { TitleIcon } from "../../../components";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.customProfileBackground100
      ? theme.customProfileBackground100
      : "#eaeaea";
  }};
  width: 100%;
  min-height: 611px;
`;
const Title = styled.div`
  color: ${({ theme }) => theme.secondary};
`;

const InnerWrap = styled.div`
  width: 935px;

  margin-top: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#f7f7f7";
  }};
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;
const TabButton = styled.div`
  width: 161px;
  height: 50px;
  font-size: 16px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-right: 8px;
  margin-bottom: 20px;
  border: solid 1px #e4eaff;
  transition: all 0.3s;
  ${({ active, theme }) =>
    active
      ? ` 
      border: solid 1px ${theme.primary};
      color: ${theme.primary};`
      : `color: ${theme.secondary}; `};
  &:hover {
    cursor: pointer;
  }
`;

const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => {
    return theme.darkMode ? "#eeeeee" : "#e4eaff";
  }};
  margin: 20px 0;
`;

const tabs = [
  { title: "report.bettingDetails", value: 2 },
  { title: "report.withdrawalDetails", value: 3 },
  { title: "report.depositDetails", value: 4 },
  { title: "report.transfer.title", value: 6 },
  { title: "report.balanceChanges.title", value: 8 },
  { title: "report.joinedPromo.title", value: 7 },
];

const Template1 = ({ transferwallet, tab, handleTabClick, switchTab }) => {
  return (
    <Container>
      <Title>
        <TitleIcon src={IconReportRedPNG} />
        {i18n.t("report.title")}
      </Title>

      <InnerWrap>
        {tabs.map((item, index) => {
          return (
            <TabButton
              key={index}
              active={tab === item.value}
              onClick={() => handleTabClick(item.value)}
            >
              {i18n.t(item.title)}
            </TabButton>
          );
        })}

        <SplitLine></SplitLine>
        {switchTab()}
      </InnerWrap>
    </Container>
  );
};

export default Template1;
