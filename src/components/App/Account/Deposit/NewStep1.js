import React from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
import { utility } from "../../../../utils/utility";
import { NewStep1Template } from "../template/deposit";

const TransferContainer = styled.div`
  color: #747474;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.span`
  float: left;
  //min-width: 100px;
  color: #151a34;
`;
const TransferLabelValue = styled.span`
  float: left;
  margin-left: 10px;
`;

const CustomNumberingContainer = styled.div`
  display: flex;
`;

const CopyIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => theme.primary};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`
    }) no-repeat center /
  contain;`;
  }};
  cursor: pointer;
  margin-left: 10px;
`;

const Numbering = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.primary : "#151a34";
  }};
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
 color  ${({ theme }) => {
   return theme.darkMode ? "#000" : "#fff";
 }};
  text-align: center;
  padding-top: 2px;
  float: left;
`;

const GapLeaver = styled.div`
  padding-left: 50px;
`;

const NewStepOne = (props) => {
  const {
    amount,
    onAmountChange,
    name,
    onNameChange,
    account,
    onAccountChange,
    selectedMethodIndex,
    onMethodChange,
    selectedChannelIndex,
    onChannelChange,
    paymentType,
    onNextClick,
    exchangeRate,
    files,
    playerNote,
    onPlayerNoteChange,
  } = props;

  if (paymentType === null) return <></>;

  const methodList = paymentType.method;
  var methodIndex = methodList[selectedMethodIndex].methodcode.toUpperCase();
  var paymentTypeCode = paymentType.paymentcode.toUpperCase();
  const paymentCode = (type) => {
    var convertUppercase = type.toUpperCase();
    return paymentTypeCode === convertUppercase;
  };

  const alteredPaymentCode = (payment) => {
    return paymentType.alteredpaymentcode
      ? paymentType.alteredpaymentcode.toUpperCase() === payment.toUpperCase()
      : false;
  };

  const method = (index) => {
    var convertUppercase = index.toUpperCase();
    return methodIndex === convertUppercase;
  };

  var numberingCount = 0;
  const SubHeaderContainer = ({ children, custom }) => {
    numberingCount++;
    return (
      <CustomNumberingContainer className="numbering">
        <div>
          <Numbering>{numberingCount}</Numbering> {children}
        </div>
        {custom && <GapLeaver>{custom}</GapLeaver>}
      </CustomNumberingContainer>
    );
  };

  const performCopy = (content) => {
    props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(content);
  };

  const formatBankCardDetail = (data) => {
    var detail = "";
    switch (data.banktype.toUpperCase()) {
      case "BANK":
        detail = `${data.detail.bankName || ""} - ${data.detail.name || ""} - ${
          data.detail.bankAccount || ""
        }`;
        break;
      case "EWALLET":
      case "E-WALLET":
        detail = `${data.detail.phone || ""} - ${data.detail.eMoneyName || ""}`;
        break;
      case "PULSA":
        detail = `${data.detail.phone || ""}`;
        break;
      default:
        detail = `${
          data.detail.bankAccount || data.detail.address || data.detail.phone
        }`;
        break;
    }
    return detail;
  };

  var displaysequence = [
    "name",
    "address",
    "bankAccount",
    "eMoneyName",
    "phone",
  ];

  return (
    <React.Fragment>
      <NewStep1Template
        template={config.accountTemplate}
        accountList={props.accountList}
        bankCardList={props.bankCardList}
        methodList={methodList}
        promotionList={props.promotionList}
        displaysequence={displaysequence}
        selectedBankCard={props.selectedBankCard}
        handleBankCardChange={props.handleBankCardChange}
        amount={amount}
        onAmountChange={onAmountChange}
        name={name}
        onNameChange={onNameChange}
        account={account}
        onAccountChange={onAccountChange}
        handleSelectAccountChange={props.handleSelectAccountChange}
        selectedMethodIndex={selectedMethodIndex}
        onMethodChange={onMethodChange}
        selectedChannelIndex={selectedChannelIndex}
        onChannelChange={onChannelChange}
        depositPromotion={props.depositPromotion}
        handleDepositPromotionChange={props.handleDepositPromotionChange}
        paymentType={paymentType}
        onNextClick={onNextClick}
        exchangeRate={exchangeRate}
        files={files}
        onFileChange={props.onFileChange}
        playerNote={playerNote}
        onPlayerNoteChange={onPlayerNoteChange}
        paymentCode={paymentCode}
        alteredPaymentCode={alteredPaymentCode}
        method={method}
        formatBankCardDetail={formatBankCardDetail}
        performCopy={performCopy}
        SubHeaderContainer={SubHeaderContainer}
      ></NewStep1Template>
    </React.Fragment>
  );
};

export default withSnackbar(NewStepOne);
