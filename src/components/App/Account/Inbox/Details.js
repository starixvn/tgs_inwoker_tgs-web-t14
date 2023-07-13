import React from "react";

import styled from "styled-components";
import CustomTextField from "../../../Share/TextField";
import moment from "moment";
const Container = styled.div``;
const Content = styled.div`
  float: left;
  background-color: #fff;
  border: solid 1px rgb(182, 182, 182);
  margin: 10px 0 0 0;
  width: 350px;
  border-radius: 3px;
  padding: 10px;
  height: 210px;
  overflow-y: scroll;
  word-break: break-all;
`;
function Details(props) {
  const { inbox } = props;
  const subject = inbox.localization?.subject || inbox.subject;
  const content = inbox.localization?.content || inbox.content;
  const formattedDate = moment(inbox.createon).format("YYYY-MM-DD hh:mm:ss");

  return (
    <Container>
      <CustomTextField value={subject} maxLength={30} readOnly bold />
      <CustomTextField value={formattedDate} readOnly />
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
}

export default Details;
