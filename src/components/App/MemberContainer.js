import React from "react";
import styled, {
  createGlobalStyle,
  keyframes,
  withTheme,
} from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import InboxIconPNG_PB from "../../assets/images/inbox-icon-pb.png";
import IconRefreshBalancePNG_PB from "../../assets/images/icon-refresh-balance-pb.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";
import { SortedMenuList } from "../../utils/HeaderSorting";
import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Popover } from "@material-ui/core";

const balanceIconSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalancePNG}`;
  }
};
const balanceHoverIconSwitcher = () => {
  switch (config.theme.toLowerCase()) {
    case "pb":
      return `${IconRefreshBalancePNG_PB}`;
    default:
      return `${IconRefreshBalanceHoverPNG}`;
  }
};

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 5px;
  justify-content: flex-end;
`;

const RefreshBalance = styled.div`
  margin: 1px 1px 0 1px;

  width: 18px;
  height: 18px;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${({ theme }) => balanceIconSwitcher()});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 13px;
  width: 18px;
  height: 18px;

  &:hover {
    background-image: url(${({ theme }) => balanceHoverIconSwitcher()});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;
const MemberUserName = styled.span`
  color: ${({ theme }) => theme.pcHeaderText};
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverText};
`;

const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
`;

const Balance = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const ActionButton = styled.div`
  background: ${({ theme }) => theme.primary};
  width: 35px;
  height: 35px;
  font-size: 35px;
  line-height: 35px;
  padding-left: 7px;
  border-radius: 25px;
  cursor: pointer;
`;

const AccountDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  font-size: 16px;
`;

const HeaderButton = styled.div`
  width: 141px;
  height: 54px;
  font-size: 20px;
  padding: 12.5px 0px;
  text-align: center;
  color: ${({ theme }) => theme.pcHeaderText};
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.pcHeaderText};
  border-radius: 30px;
  text-transform: uppercase;
`;

const LeftContainer = styled.div``;

const AccountContainer = styled.div`
  width: 180px;
  height: 54px;
  background: #242958;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AccountName = styled.div`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Mailbox = styled.div`
  width: 25px;
  height: 25px;
  mask: url(${InboxIconPNG}) no-repeat;
  mask-position: center;
  margin-left: 20px;
  cursor: pointer;
  background: #fff;
  &:hover {
    background: ${({ theme }) => theme.primary};
  }
`;

const RightContainer = styled.div`
  display: flex;
`;

const BalanceContainer = styled.div`
  width: 180px;
  height: 54px;
  background: #0f1029;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
`;

const BalanceLabel = styled.div`
  color: ${({ theme }) => theme.primary};
`;
const BalanceValue = styled.div`
  color: #fff;
`;
const RefreshContainer = styled.div``;

const ActionContainer = styled.div`
  width: 38px;
  height: 54px;
  background: #242958;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MemberMenuPopover = styled(Popover)`
  .MuiPopover-paper {
    background: none;
  }
`;

const PopoverContent = styled.div`
  width: 245px;
  height: auto;
  border-radius: 10px;
  padding-top: 20px;
  margin-top: 20px;
  background: ${({ theme }) => theme.containerBg3};
  max-height: ${({ height }) => {
    return height ? height : "500px";
  }};
  color: #fff;
  border: 1px solid #191b5a;

  overflow: auto;
  user-select: none;

  ::-webkit-scrollbar {
    width: 5px;
    display: none;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const PopoverButton = styled.div`
  width: 100%;
  height: 30px;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;
  display: flex;
  gap: 10px;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CSContainer = styled.div`
  border-top: 1px solid #191b5a;
  padding: 20px 0;
`;

const CSIcon = styled.div`
  width: 19px;
  height: 19px;
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHeaderMenu/cs.svg`})
    no-repeat center / contain;
  background: #fff;

`;
const CSButton = styled(PopoverButton)`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.primary};
  width: 139px;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
  gap: 0px;
  &:hover {
    ${CSIcon} {
      background: ${({theme})=> theme.primary};
    }
  }
`;

const CSDescription = styled.div`

`;

const LogoutIcon = styled.div`
  width: 20px;
  height: 20px;
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/pcHeaderMenu/logout.svg`})
    no-repeat center / contain;
  background: #fff;
`;

const LogoutContainer = styled.div`
  padding-top: 10px;
  border-top: 1px solid #191b5a;

  &:hover {
    ${LogoutIcon} {
      background: ${({theme})=> theme.primary};
    }
  }
`;


const MemberContainer = (props) => {
  const vipSwitcher = (rank) => {
    switch (rank) {
      case 1:
        return "VIP 1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return;
    }
  };

  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAction, setAnchorAction] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleActionClick = (e) => {
    setAnchorAction(e.currentTarget);
  };

  const handleActionClose = (e) => {
    setAnchorAction(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const openAction = Boolean(anchorAction);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <LeftContainer>
        <AccountContainer>
          <AccountName onClick={props.onhandleProfile}>
            {props.account.info.member_username}(
            {config.features.CustomVIP
              ? vipSwitcher(props.account.info.member_level_id)
              : "VIP" + props.account.info.member_level_id}
            )
          </AccountName>
          <Mailbox onClick={props.onhandleInboxClick}></Mailbox>
        </AccountContainer>
      </LeftContainer>
      <RightContainer>
        <BalanceContainer
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          <BalanceLabel>{i18n.t("web.header.mainAccount")}:</BalanceLabel>
          <BalanceValue>
            {config.currency} {Common.formatNumberWithThousand(totalBalance)}
          </BalanceValue>
          <RefreshContainer></RefreshContainer>
        </BalanceContainer>
        <ActionContainer
          onClick={(e) => {
            handleActionClick(e);
          }}
        >
          <ExpandMore />
        </ActionContainer>
      </RightContainer>

      <MemberMenuPopover
        elevation="0"
        open={openAction}
        anchorEl={anchorAction}
        onClose={handleActionClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <PopoverContent>
          <PopoverButton onClick={props.onhandleDeposit}>
            {i18n.t("web.header.deposit")}
          </PopoverButton>
          <PopoverButton onClick={props.onhandleWithdraw}>
            {i18n.t("common.withdrawal")}
          </PopoverButton>
          {props.game.containTransferWallet &&
            !config.features.NewTransferUI && (
              <PopoverButton onClick={props.onhandleTransfer}>
                {i18n.t("web.header.transfer")}
              </PopoverButton>
            )}
          <PopoverButton onClick={props.onhandleSecurityClick}>
            {i18n.t("security")}
          </PopoverButton>
          <PopoverButton onClick={props.onhandleReportClick}>
            {i18n.t("report.title")}
          </PopoverButton>
          <PopoverButton onClick={props.onhandleProfile}>
            {i18n.t("web.account.profile")}
          </PopoverButton>
          <CSContainer>
            <CSButton onClick={props.onhandleShowCSClick}>
              <CSIcon />
              {i18n.t("onlinechat")}
            </CSButton>
            <CSDescription>{i18n.t('')}</CSDescription>
          </CSContainer>
          <LogoutContainer onClick={props.onhandleLogout}>
            <PopoverButton>
              <LogoutIcon />
              {i18n.t("web.header.logout")}
            </PopoverButton>
          </LogoutContainer>
        </PopoverContent>
      </MemberMenuPopover>
    </Container>
  );
};

export default withTheme(MemberContainer);
