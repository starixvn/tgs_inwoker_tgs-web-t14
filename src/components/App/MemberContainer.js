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
import IconRefreshPNG from "../../assets/images/icon-refresh.png";

import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";
import { SortedMenuList } from "../../utils/HeaderSorting";
import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Popover } from "@material-ui/core";

const Container = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 5px;
  justify-content: flex-end;
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

const MailboxContainer = styled.div`
  position: relative;
  &:after {
    content: "${(props) => props.num}";
    width: 15px;
    height: 15px;
    background: #ffa200;
    position: absolute;
    top: 0px;
    right: 0;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
  }
`;

const Mailbox = styled.div`
  width: 25px;
  height: 30px;
  mask: url(${process.env.PUBLIC_URL +
    "/assets/images/pcAccountMenu/icon-memo.svg"})
    no-repeat;
  mask-position: center;
  mask-size: 25px 20px;
  margin-left: 20px;
  margin-right: 4px;
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
`;

const BalanceLabel = styled.div`
  color: ${({ theme }) => theme.primary};
`;
const BalanceValue = styled.div`
  cursor: pointer;
  color: #fff;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
const rotateKeyFrame = keyframes`
  0% {
    transform:scaleX(-1) rotate(-45deg);
  }
  100% {
    transform:scaleX(-1) rotate(-400deg);
  }
`;
const RefreshButtonIcon = styled.div`
  width: 17px;
  height: 17px;
  mask: url(${IconRefreshPNG}) no-repeat center;
  mask-size: contain;
  background: #005DAE;
  transform: scaleX(-1) rotate(-45deg);
  transform-origin: 8px 8px;
`;
const RefreshButton = styled.div`
  width: 17px;
  height: 17px;

  &:hover {
    cursor: pointer;
    ${RefreshButtonIcon} {
      animation: ${rotateKeyFrame} 1s linear 0s infinite;
    }
  }
`;
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

  & > svg {
    ${(props) =>
      props.active
        ? `
    transform: rotate(0deg);
    `
        : `    transform: rotate(-90deg);
    `}
    transition: all 0.5s;
  }
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
  mask: url(${process.env.PUBLIC_URL + `/assets/images/pcHeaderMenu/cs.svg`})
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
      background: ${({ theme }) => theme.primary};
    }
  }
`;

const CSDescription = styled.div``;

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
      background: ${({ theme }) => theme.primary};
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
          <MailboxContainer num={props.account.info.message_num}>
            <Mailbox onClick={props.onhandleMemoClick}></Mailbox>
          </MailboxContainer>
        </AccountContainer>
      </LeftContainer>
      <RightContainer>
        <BalanceContainer>
          <BalanceLabel>{i18n.t("web.header.mainAccount")}:</BalanceLabel>
          <BalanceValue
            onClick={(e) => {
              handleTransfer(e);
            }}
          >
            ₱{Common.formatNumberWithThousand(totalBalance)}
          </BalanceValue>
          <RefreshButton onClick={props.onhandleRefreshBalanceClick}>
            <RefreshButtonIcon></RefreshButtonIcon>
          </RefreshButton>
        </BalanceContainer>
        <ActionContainer
          active={openAction}
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
            <CSDescription>{i18n.t("")}</CSDescription>
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
