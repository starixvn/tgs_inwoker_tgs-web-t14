import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import CircularProgress from "@material-ui/core/CircularProgress";

import BtnLogout from "../../../Share/ButtonBlankWap";
import Common from "../../../../utils/Common";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import Header from "../../Share/Header";

const Container = styled.div`
  width: 100%;

  min-height: 100vh;
  padding: 120px 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
`;

const NameContainer = styled.div`
  float: left;

  font-size: 40px;

  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const MainWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;

const AmountWrapper = styled.div`
  min-height: 130px;
  padding: 20px 0 0 0;
`;
const TotalWalletContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
`;
const WalletLabel = styled.div`
  color: ${({ theme }) => theme.wapPrimary};
  float: left;
`;
const WalletAmount = styled.div`
  color: ${({ theme }) => theme.wapPrimary};
  font-weight: 500;
  float: left;
  margin-left: 15px;
`;

const ListView = styled.div`
  padding: 10px 30px 130px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #e23a3f;
  border-radius: 50%;
  position: absolute;
`;

const MessageRedDot = styled(RedDot)`
  display: block;
  position: relative;
`;

const ProfileMenuHolder = styled.div`
  padding: 0 50px 20px 50px;
  width: 600px;
  border-radius: 50px;
`;

const ProfileMenuWrapper = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  color: #fff;
`;

const ProfileMenuList = styled.div`
  font-size: 24px;
  padding: 20px 20px 20px 0;
  display: flex;
  border-bottom: solid 1px rgba(255, 255, 255, 1);
  justify-content: space-between;
  align-items: center;

  :last-child {
    border-bottom: 0px;
  }
`;

const TheUserContainer = styled.div`
  padding: 20px 0 10px 0;
`;

const TextAndIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const Notification = styled.div`
  position: relative;
`;

const ShowAmountContainer = styled.div`
  font-size: 28px;
  margin-top: 12px;
  color: ${({ theme }) => theme.wapPrimary};
`;

const LogoutButton = styled.div`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  width: fit-content;
  padding: 30px 50px;
  margin-top: 20px;
  border-radius: 50px;
  font-size: 34px;
  text-transform: uppercase;
  filter: drop-shadow(0 0 4px ${({ theme }) => theme.primary})
    drop-shadow(0 0 4px ${({ theme }) => theme.primary}) contrast(1)
    brightness(1);
`;
class My extends Component {
  constructor(props) {
    super(props);
    var balance = 0;
    var loaded = true;
    if (this.props.wallet.balanceList.length > 0) {
      balance = this.getTotalBalance();
      loaded = true;
    }
    this.state = {
      balance: balance,
      balanceLoaded: loaded,
      avatarError: false,
      showAmount: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.account.token === null) {
      this.props.appHistory.replace("/login");
    }
    if (this.props.wallet.balanceList.length <= 0) {
      this.props.getBalanceList();
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.balanceList.length !==
        this.props.wallet.balanceList.length &&
      this.props.wallet.balanceList.length > 0
    ) {
      this.setState({
        ...this.state,
        balance: this.getTotalBalance(),
        balanceLoaded: true,
      });
    }
  }
  getTotalBalance = () => {
    var balance = 0;
    for (let i = 0; i < this.props.wallet.balanceList.length; i++) {
      try {
        balance += parseFloat(
          this.props.wallet.balanceList[i].balance.replace(/,/g, "")
        );
      } catch (e) {}
    }
    return balance;
  };
  handleLogoutClick = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/");
      }
    });
  };

  profileMenu = [
    {
      icon: "icon-profile-profile",
      title: i18n.t("wap.main.account.personalInfo"),
      to: "/profile",
    },
    {
      icon: "icon-profile-inbox",
      title: i18n.t("wap.main.account.inbox"),
      to: "/inbox",
      notification: this.props.account.info.message_num > 0 ? true : false,
    },
    {
      icon: "icon-profile-report",
      title: i18n.t("report.bettingDetails"),
      to: "/report/2",
    },
    {
      icon: "icon-profile-withdrawal",
      title: i18n.t("wap.main.account.withdrawal"),
      to: "/report/3",
    },
    {
      icon: "icon-profile-topup",
      title: i18n.t("wap.main.account.deposit"),
      to: "/report/4",
    },
    {
      icon: "icon-profile-report-transfer",
      title: i18n.t("wap.main.account.transfer"),
      to: "/report/6",
    },
    {
      icon: "icon-profile-report",
      title: i18n.t("report.joinedPromo.title"),
      to: "/report/7",
    },
    {
      icon: "icon-profile-report-transfer",
      title: i18n.t("report.balanceChanges.title"),
      to: "/report/8",
    },
    {
      icon: "icon-vip",
      title: "VIP",
      to: "/vip",
    },
  ];

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };

  navigateTo = (to) => {
    window.scrollTo(0, 0);
    this.props.navigate(to);
  };

  render() {
    return (
      <Container>
        <Header
          onBackClick={this.handleBackClick}
          title={i18n.t("wap.main.my")}
          position={"fixed"}
          backgroundColor={"transparent"}
        ></Header>
        <TheUserContainer>
          <InfoContainer>
            <NameContainer>
              {this.props.account.info.member_username}
            </NameContainer>

            <AmountWrapper>
              <MainWalletContainer>
                <WalletLabel>
                  {i18n.t("wap.main.account.mainAccount")}
                </WalletLabel>
                <WalletAmount>
                  {this.props.wallet.mainSymbol}
                  {Common.formatNumberWithThousand(
                    this.props.wallet.mainBalance
                  )}
                </WalletAmount>
              </MainWalletContainer>
              <TotalWalletContainer>
                <WalletLabel>
                  {i18n.t("wap.main.account.totalFund")}
                </WalletLabel>
                <WalletAmount>
                  {(() => {
                    if (this.state.balanceLoaded) {
                      return (
                        this.props.wallet.mainSymbol +
                        Common.formatNumberWithThousand(
                          this.props.wallet.mainBalance +
                            this.props.game.providerList
                              .filter(
                                (item) =>
                                  item.status === 0 &&
                                  item.transferwallet === true
                              )
                              .reduce((a, v) => (a = a + v.balance), 0)
                        )
                      );
                    } else {
                      return (
                        <CircularProgress
                          size={25}
                          color={"secondary"}
                          style={{ margin: "6px 0 0 10px" }}
                        ></CircularProgress>
                      );
                    }
                  })()}
                </WalletAmount>
              </TotalWalletContainer>
            </AmountWrapper>
          </InfoContainer>
        </TheUserContainer>
        <ListView>
          <ProfileMenuHolder>
            <ProfileMenuWrapper>
              {
                //if this.props.game.containTransferWallet is false
                // filter out the transfer from the menu
                (this.props.game.containTransferWallet
                  ? this.profileMenu
                  : this.profileMenu.filter((data) => data.to !== "/report/6")
                )
                  .filter((data) =>
                    config.features.HaveVIPFeature ? data : data.to !== "/vip"
                  )
                  .map((data, index) => {
                    return (
                      <ProfileMenuList
                        onClick={() => {
                          this.navigateTo(data.to);
                        }}
                      >
                        <TextAndIcon>
                          <Icon icon={data.icon} />
                          <div>{data.title}</div>
                        </TextAndIcon>
                        <Notification>
                          {data.title === i18n.t("wap.main.account.inbox") &&
                          this.props.account.info.message_num > 0 ? (
                            <MessageRedDot />
                          ) : (
                            ""
                          )}
                        </Notification>
                      </ProfileMenuList>
                    );
                  })
              }
              {config.features.HaveDownloadFeature && (
                <ProfileMenuList
                  onClick={() => {
                    this.navigateTo("/main/download");
                  }}
                >
                  <TextAndIcon>
                    <Icon icon="icon-download" />
                    <div>{i18n.t("wap.main.account.appDownload")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}
              {this.props.general.haveAffiliate && (
                <ProfileMenuList
                  onClick={() => {
                    this.navigateTo("/affiliate");
                  }}
                >
                  <TextAndIcon>
                    <Icon icon="icon-affiliate" />
                    <div>{i18n.t("web.account.affiliate")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}

              <ProfileMenuList
                onClick={() => {
                  if (
                    this.props.wallet.bankCardList != null &&
                    this.props.wallet.bankCardList.length === 0 &&
                    config.features.AddCard_NotAllowedEditDelete
                  ) {
                    this.props.alert("", i18n.t("card.toEdit"));
                  } else {
                    this.navigateTo("/card");
                  }
                }}
              >
                <TextAndIcon>
                  <Icon icon="icon-profile-card" />
                  <div>{i18n.t("wap.main.account.manageBank")}</div>
                </TextAndIcon>
              </ProfileMenuList>

              {config.features.Wap_ShowProfileTransfer && (
                <ProfileMenuList onClick={() => this.navigateTo("/transfer")}>
                  <TextAndIcon>
                    <Icon icon="icon-profile-transfer" />
                    <div>{i18n.t("common.transfer")}</div>
                  </TextAndIcon>
                </ProfileMenuList>
              )}

              <ProfileMenuList
                onClick={() => this.navigateTo("/setting/language")}
              >
                <TextAndIcon>
                  <Icon icon="icon-profile-language" />
                  <div>{i18n.t("common.language")}</div>
                </TextAndIcon>
              </ProfileMenuList>
            </ProfileMenuWrapper>
          </ProfileMenuHolder>
          <div className="clear"></div>
          <LogoutButton onClick={this.handleLogoutClick}>
            {i18n.t("web.header.logout")}
          </LogoutButton>
        </ListView>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(My);
