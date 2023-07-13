import React, { useState } from "react";
import styled from "styled-components";
import CustomTextField from "../../../../Share/TextField";
import CustomButton from "../../../../Share/Button";
import i18n from "../../../../../utils/i18n";
import { AccountService } from "../../../../../api-services/services/AccountService";
import { UPDATE_INFO } from "../../../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../../../utils/ErrorSwitcher";
import { useSnackbar } from "notistack";
import IconInputReceivePNG from "../../../../../assets/images/icon-input-receive.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import config from "../../../../../config/config";
const Content = styled.div`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  text-align: center;
  margin-top: 90px;
  padding: 0 30px;
  color: ${({ theme }) => theme.secondary};
`;

const LabelLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

const InstantMessaging = ({
  platform,
  dispatch,
  handleCloseDialog,
  handleCSClick,
  account,
}) => {
  const paramsSwitcher = (params) => {
    switch (params) {
      case "fb":
        return "facebookmessenger";
      default:
        return params;
    }
  };

  const regexSwitcher = (params) => {
    switch (params) {
      case "qq":
        return "^[1-9]\\d{4,14}$";
      case "wechat":
        return "^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$";
      default:
        return;
    }
  };

  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(account.info[`member_${platform}`] || "");

  const onhandleTextChange = (e) => {
    setValue(e.target.value);
  };

  const onhandleClick = () => {
    const re = new RegExp(regexSwitcher(platform));
    if (!value.match(re)) {
      enqueueSnackbar(i18n.t(`${platform}_invalid`), {
        variant: "error",
      });
      return;
    }

    AccountService.UpdateIM(value, platform, paramsSwitcher(platform)).then(
      (response) => {
        if (response.IsSuccess) {
          dispatch({
            type: UPDATE_INFO,
            payload: {
              ["member_" + platform]: value,
            },
          });
          handleCloseDialog();
        } else {
          enqueueSnackbar(ErrorSwitcher.getTranslation(response.info), {
            variant: "error",
          });
        }
      }
    );
  };

  return (
    <div>
      <CustomTextField
        placeholder={i18n.t(`${platform}_account`)}
        adornment={IconInputReceivePNG}
        handleTextFieldChange={onhandleTextChange}
        defaultValue={value}
        type={"text"}
        readOnly={
          account.info["member_" + platform] &&
          (config.features.ChangesNotAllowed ||
            config.features.Profile_ExistingDetails_ViewOnly)
        }
        maxLength={15}
      ></CustomTextField>
      {account.info["member_" + platform] &&
        (config.features.ChangesNotAllowed ||
          config.features.Profile_ExistingDetails_ViewOnly) && (
          <Content>
            {i18n.t(`${platform}_toEdit`)}
            {
              <LabelLink
                onClick={() =>
                  handleCSClick(
                    account.info.member_username,
                    account.info.member_username
                  )
                }
              >
                {i18n.t("common.customerService")}
              </LabelLink>
            }
          </Content>
        )}

      {!(
        account.info["member_" + platform] &&
        (config.features.ChangesNotAllowed ||
          config.features.Profile_ExistingDetails_ViewOnly)
      ) && (
        <CustomButton
          name={i18n.t("common.submit")}
          handleClick={onhandleClick}
        ></CustomButton>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, null)(InstantMessaging);
