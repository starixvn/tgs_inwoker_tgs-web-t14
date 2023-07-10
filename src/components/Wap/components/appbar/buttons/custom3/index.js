import styled from "styled-components";
import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import i18n from "../../../../../../utils/i18n";

const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary
      ? `solid 1px ${theme.buttonBackground}`
      : `solid 1px ${theme.primaryText}`;
  }};
  color: ${({ primary, theme }) => {
    return primary
      ? theme.wapPrimary
        ? theme.wapPrimary
        : theme.buttonText2
      : theme.primaryText;
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 15px;
`;
const TransparentColoredButton = styled(CustomColoredButton)`
  border: solid 1px #fff;
  color: #fff;
`;

export const CustomThemedButton3 = ({ props }) => {
  return (
    <CustomButtonContainer>
      {config.features.HaveVIPFeature &&
        config.features.HomePage_DisplayVIP && (
          <div
            onClick={() => {
              window.scrollTo(0, 0);
              AppHistory.push("/vip");
            }}
            style={{
              padding: "10px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/images/wapp/home-vip.png"}
              alt=""
              style={{ height: 30 }}
            />
            VIP
          </div>
        )}
      <TransparentColoredButton
        onClick={() => {
          AppHistory.push("/login");
        }}
        style={{ borderRadius: 30 }}
      >
        {i18n.t("common.login")}
      </TransparentColoredButton>
      <CustomColoredButton
        primary
        onClick={() => {
          AppHistory.push("/login?do=register");
        }}
        style={{ borderRadius: 30 }}
      >
        {i18n.t("common.register")}
      </CustomColoredButton>
    </CustomButtonContainer>
  );
};
