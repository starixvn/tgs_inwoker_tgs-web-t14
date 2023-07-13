import React, { Component } from "react";
import { connect } from "react-redux";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
import Common from "../../../../utils/Common";
import { AddCardTemplate } from "../template/withdrawal";
import { utility } from "../../../../utils/utility";
class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      number: "",
      bankName: "",
      bankAccountName: "",
      bankBranch: "",
      selectedChannelIndex: 0,
      selectedBankTypeIndex: 0,
      channelList: [],
      disableBankNameInput: false,
      disableBankAccountNameInput: false,
      name: "",
      phone: "",
    };
  }

  async componentDidMount() {
    await this.formatChannelList();
    if (this.props.isDeposit && this.props.bankCardList.length > 0) {
      var defaultCard = this.props.bankCardList.filter(
        (card) => card.default
      )[0];
      var name = "";
      var disableBankAccountNameInput = false;
      switch (
        this.props.depositList[
          this.state.selectedBankTypeIndex
        ].banktype.toUpperCase()
      ) {
        case "BANK":
        case "EWALLET":
          name = defaultCard.detail.eMoneyName || defaultCard.detail.name;
          disableBankAccountNameInput = true;
          break;
        default:
          name = "";
          break;
      }
      this.setState({
        ...this.state,
        bankAccountName: name,
        disableBankAccountNameInput: disableBankAccountNameInput,
      });
    }
  }
  componentDidUpdate(preProps, preState) {
    if (
      !this.props.isDeposit &&
      preProps.withdrawalList.length !== this.props.withdrawalList.length
    ) {
      this.formatChannelList();
    }
    if (
      this.props.isDeposit &&
      preProps.depositList.length !== this.props.depositList.length
    ) {
      this.formatChannelList();
    }
    if (preState.selectedBankTypeIndex !== this.state.selectedBankTypeIndex) {
      this.formatChannelList();
    }
  }
  formatChannelList = () => {
    var i = 0;
    var channel = [];
    var channelList = [];
    var addedChannel = [];
    if (this.props.isDeposit) {
      if (this.props.depositList.length > 0) {
        channelList =
          this.props.depositList[this.state.selectedBankTypeIndex].channel;
        if (this.props.depositList.length > 0) {
          for (i = 0; i < channelList.length; i++) {
            if (addedChannel.indexOf(channelList[i].id) < 0) {
              addedChannel.push(channelList[i].id);
              channel.push(channelList[i]);
            }
          }
        }
      }
    } else {
      if (this.props.withdrawalList.length > 0) {
        channelList =
          this.props.withdrawalList[this.state.selectedBankTypeIndex].channel;
        if (this.props.withdrawalList.length > 0) {
          for (i = 0; i < channelList.length; i++) {
            if (addedChannel.indexOf(channelList[i].id) < 0) {
              addedChannel.push(channelList[i].id);
              channel.push(channelList[i]);
            }
          }
        }
      }
    }
    var disableInput = false;
    var bankName = "";
    if (channel.length > 0) {
      if (
        channel[this.state.selectedChannelIndex].channelcode !== "CustomBank"
      ) {
        disableInput = true;
        bankName = channel[this.state.selectedChannelIndex].channelcode;
      }
    }
    this.setState({
      ...this.state,
      channelList: channel,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
    return channel;
  };
  handleBankTypeChange = (e) => {
    var name = "";
    var disableBankAccountNameInput = false;
    if (this.props.isDeposit && this.props.bankCardList.length > 0) {
      var defaultCard = this.props.bankCardList.filter(
        (card) => card.default
      )[0];
      if (Common.arrayValidator(this.props.depositList)) {
        switch (this.props.depositList[e.target.value].banktype.toUpperCase()) {
          case "EWALLET":
          case "BANK":
            name = defaultCard.detail.eMoneyName || defaultCard.detail.name;
            disableBankAccountNameInput = true;
            break;
          default:
            break;
        }
      }
    }
    this.setState({
      ...this.state,
      selectedBankTypeIndex: e.target.value,
      selectedChannelIndex: 0,
      bankAccountName: name,
      disableBankAccountNameInput: disableBankAccountNameInput,
      number: "",
    });
  };
  handleChannelChange = (e) => {
    var disableInput = false;
    var bankName = "";
    if (this.state.channelList[e.target.value].channelcode !== "CustomBank") {
      disableInput = true;
      bankName = this.state.channelList[e.target.value].channelcode;
    }
    this.setState({
      ...this.state,
      selectedChannelIndex: e.target.value,
      bankName: bankName,
      disableBankNameInput: disableInput,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  handleNumberChange = (e) => {
    this.setState({ ...this.state, number: e.target.value });
  };
  handleBankNameChange = (e) => {
    this.setState({ ...this.state, bankName: e.target.value });
  };
  handleBankAccountNameChange = (e) => {
    this.setState({ ...this.state, bankAccountName: e.target.value });
  };
  handleBankBranchChange = (e) => {
    this.setState({ ...this.state, bankBranch: e.target.value });
  };

  handleNameChange = (e) => {
    this.setState({ ...this.state, name: e.target.value });
  };
  handlePhoneChange = (e) => {
    this.setState({ ...this.state, phone: e.target.value });
  };

  handleNextClick = (e) => {
    const selected = this.props.isDeposit
      ? this.props.depositList[this.state.selectedBankTypeIndex]
      : this.props.withdrawalList[this.state.selectedBankTypeIndex];
    let detail = {};

    const {
      selectedChannelIndex,
      channelList,
      bankName,
      bankAccountName,
      bankBranch,
      number,
      name,
      phone,
    } = this.state;

    const trimAndRemoveSpace = (value) => utility.removeSpace(value.trim());

    if (selected.banktype === "Bank") {
      let bankNameValue = channelList[selectedChannelIndex].channelcode;
      if (
        bankNameValue === "CustomBank" &&
        !(
          config.features.AddCard_HideCertainField ||
          config.features.AddCard_Bank_Custom_IDR
        )
      ) {
        bankNameValue = bankName.trim();
      }

      if (bankNameValue === "") {
        this.props.enqueueSnackbar(i18n.t("card.addCard.msgEnterBankName"), {
          variant: "error",
        });
        return;
      }

      if (bankAccountName.trim() === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterBankAccountName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      detail = {
        bankAccount: trimAndRemoveSpace(number),
        bankName: trimAndRemoveSpace(bankNameValue),
        name: trimAndRemoveSpace(bankAccountName),
        bankBranch: trimAndRemoveSpace(bankBranch),
      };
    } else if (
      selected.banktype === "ThirdParty" ||
      selected.banktype === "FPS"
    ) {
      if (name === "") {
        this.props.enqueueSnackbar(
          i18n.t("profile.nameVerify.msgPlsEnterName"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (phone === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterPhone"), {
          variant: "error",
        });
        return;
      }

      if (
        phone.length < 8 ||
        phone.length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
        return;
      }

      detail = {
        username: trimAndRemoveSpace(name),
        phone: trimAndRemoveSpace(phone),
      };
    } else if (selected.banktype === "EWallet") {
      if (bankAccountName.trim() === "") {
        this.props.enqueueSnackbar(
          i18n.t("card.addCard.msgEnterEwalletAccount"),
          {
            variant: "error",
          }
        );
        return;
      }

      if (
        number.trim().length < 8 ||
        number.trim().length > (config.features.MAX_PHONE_LENGTH || 10)
      ) {
        this.props.enqueueSnackbar(
          i18n
            .t("common.noReachMin")
            .replace(/{maxlength}/g, config.features.MAX_PHONE_LENGTH || 10),
          {
            variant: "error",
          }
        );
        return;
      }

      if (config.features.AddCard_CustomParam_IDR) {
        detail = {
          phone: trimAndRemoveSpace(number),
          eMoneyName: trimAndRemoveSpace(bankAccountName),
        };
      } else {
        detail = {
          name: trimAndRemoveSpace(bankAccountName),
          phone: trimAndRemoveSpace(number),
        };
      }
    } else if (selected.banktype === "Pulsa") {
      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      if (config.features.AddCard_CustomParam_IDR) {
        detail = {
          phone: trimAndRemoveSpace(number),
        };
      } else {
        detail = {
          phone: trimAndRemoveSpace(number),
        };
      }
    } else {
      if (number.trim() === "") {
        this.props.enqueueSnackbar(i18n.t("common.msgEnterWithdrawalNumber"), {
          variant: "error",
        });
        return;
      }

      detail = {
        address: trimAndRemoveSpace(number),
      };
    }

    this.props.onhandleNextClick(
      channelList[selectedChannelIndex].channelid,
      selected.banktype,
      detail
    );
  };

  render() {
    const { withdrawalList, depositList } = this.props;
    const listDetector = (list, type) => {
      return (
        Common.arrayValidator(list) &&
        list[this.state.selectedBankTypeIndex].banktype === type
      );
    };

    const selectedBankType = (type) => {
      return this.props.isDeposit
        ? listDetector(depositList, type)
        : listDetector(withdrawalList, type);
    };

    const eWalletCustom =
      selectedBankType("EWallet") && config.features.AddCard_EWalletCustoms;

    const eWalletCustomIDR =
      (selectedBankType("EWallet") &&
        config.features.AddCard_Bank_Custom_IDR) ||
      (selectedBankType("Bank") && config.features.AddCard_Bank_Custom_IDR);

    const bankList = [
      "กสิกรไทย (Kasikorn Bank- KKR)",
      "ไทยพาณิชย์ (Siam Commercial Bank - SCB)",
      "กรุงไทย (KrungThai Bank - KTB)",
      "กรุงเทพ (Bankok Bank - BBL)",
      "ออมสิน (Government Savings Bank - GSB)",
      "ทหารไทยธนาชาต (TMBThanachart Bank - TTB)",
      "กรุงศรี (Bank of Ayudhya - KrungSri)",
      "ธ.ก.ส (Bank for Agriculture and Agricultural Cooperatives - BAAC)",
      "ยูโอบี (United Overseas Bank - UOB)",
      "ซีไอเอ็มบีไทย (CIMB THAI - CIMB)",
      "เกียรตินาคินภทัร (Kiatnakin Phatra Bank - KKP)",
      "อาคารสงเคราะห์ (Government Housing Bank - GH)",
    ];

    return (
      <React.Fragment>
        <AddCardTemplate
          template={config.accountTemplate}
          isDeposit={this.props.isDeposit}
          eWalletCustom={eWalletCustom}
          eWalletCustomIDR={eWalletCustomIDR}
          depositList={depositList}
          withdrawalList={withdrawalList}
          bankList={bankList}
          channelList={this.state.channelList}
          selectedBankType={selectedBankType}
          selectedBankTypeIndex={this.state.selectedBankTypeIndex}
          selectedChannelIndex={this.state.selectedChannelIndex}
          bankName={this.state.bankName}
          disableBankNameInput={this.state.disableBankNameInput}
          bankAccountName={this.state.bankAccountName}
          disableBankAccountNameInput={this.state.disableBankAccountNameInput}
          number={this.state.number}
          handleBankTypeChange={this.handleBankTypeChange}
          handleChannelChange={this.handleChannelChange}
          handleBankNameChange={this.handleBankNameChange}
          handleBankBranchChange={this.handleBankBranchChange}
          handleBankAccountNameChange={this.handleBankAccountNameChange}
          handleNameChange={this.handleNameChange}
          handlePhoneChange={this.handlePhoneChange}
          handleNumberChange={this.handleNumberChange}
          handleNextClick={this.handleNextClick}
          showBack={this.props.showBack}
          onhandleBackClick={this.props.onhandleBackClick}
        />
      </React.Fragment>
    );
  }
}

export default connect(null, null)(withSnackbar(AddCard));
