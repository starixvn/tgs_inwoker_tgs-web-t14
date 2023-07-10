import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Header from "../Share/Header";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import CheckIcon from "@material-ui/icons/Check";
import i18n from "../../../utils/i18n";
import { withStyles } from "@material-ui/core/styles";
import CustomButton from "../Share/Button";

import { generalAction } from "../../../api-services/actions/generalAction";
import { uiAction } from "../../../api-services/actions/uiAction";
import { GeneralService } from "../../../api-services/services/GeneralService";
import ErrorSwitcher from "../../../utils/ErrorSwitcher";

const imageMap = {
  "zh-CN": process.env.PUBLIC_URL + `/assets/images/wapp/cn.png`,
  "zh-TW": process.env.PUBLIC_URL + `/assets/images/wapp/tw.png`,
  "en-US": process.env.PUBLIC_URL + `/assets/images/wapp/en.png`,
  "th-TH": process.env.PUBLIC_URL + `/assets/images/wapp/th.png`,
  "vi-VN": process.env.PUBLIC_URL + `/assets/images/wapp/vn.png`,
  "id-ID": process.env.PUBLIC_URL + `/assets/images/wapp/id.png`,
};
const Container = styled.div`
  width: 100%;
  overflow: hidden;

  min-height: 100vh;
`;

const CustomList = withStyles({
  root: {
    width: "100%",
    maxWidth: 750,

    fontSize: "30px",
  },
})(List);
const CustomListItem = styled.div`
  padding: 10px 100px;
`;
const CustomListItemText = styled.div`
  background: #202137;
  padding: 30px 40px;
  border-radius: 50px;
  text-align: center;
  color: #fff;

  ${({ selected }) =>
    selected &&
    `
    background: #fff;
    color: #202137;
  `}
`;
class Profile extends Component {
  state = {
    checked: i18n.language,
  };
  languages = [
    { name: "简体中文", code: "zh-CN" },
    { name: "繁体中文", code: "zh-TW" },
    { name: "English", code: "en-US" },
  ];
  componentDidMount() {
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/login");
    }
  }
  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleToggle = (value) => () => {
    this.setState({ ...this.state, checked: value });
  };
  handleUpdate = () => {
    i18n.changeLanguage(this.state.checked);
    this.props.appHistory.replace("/" + this.state.checked);
    window.location.reload();
  };
  render() {
    return (
      <Container>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("common.language")}
        ></Header>{" "}
        <div style={{ height: 90 }} />
        <CustomList>
          {this.props.general.brandLanguage.map((value) => {
            const labelId = `checkbox-list-label-${value.culturecode}`;

            return (
              <CustomListItem
                key={value.culturecode}
                onClick={this.handleToggle(value.culturecode)}
              >
                <CustomListItemText
                  id={labelId}
                  selected={this.state.checked === value.culturecode}
                >
                  {i18n.t("lang." + value.culturecode)}
                </CustomListItemText>
              </CustomListItem>
            );
          })}
        </CustomList>
        <CustomButton
          label={i18n.t("common.update")}
          style={{ margin: "50px auto" }}
          onClick={this.handleUpdate}
        ></CustomButton>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
