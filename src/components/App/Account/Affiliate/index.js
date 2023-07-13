import React from "react";
import { connect } from "react-redux";
import i18n from "../../../../utils/i18n";
import { useSnackbar } from "notistack";
import { AppHistory } from "../../../../history/History";
import { utility } from "../../../../utils/utility";
import config from "../../../../config/config";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { useEffect } from "react";
import Template13 from "./template13";
import Template1 from "./template1";

const Affiliate = ({ general, getBrandAllAgent, account }) => {
  var affiliateLink = `https://${window.location.hostname}/p/${account.info.playercode}?do=register`;

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (general.rebates.length === 0) {
      getBrandAllAgent();
    }
  });
  const handleBackClick = () => {
    AppHistory.goBack();
  };
  const handleCopyLink = () => {
    enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(affiliateLink);
  };
  const handleCopyReferralID = () => {
    enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });
    utility.copy(account.info.playercode);
  };
  const handleQrAction = (option) => {
    var svgElement =
      document.querySelector("#qrcode-container").firstElementChild;
    let { width, height } = svgElement.getBBox();
    let clonedSvgElement = svgElement.cloneNode(true);
    let outerHTML = clonedSvgElement.outerHTML,
      blob = new Blob([outerHTML], { type: "image/svg+xml;charset=utf-8" });
    let URL = window.URL || window.webkitURL || window;
    let blobURL = URL.createObjectURL(blob);
    let image = new Image();
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = 150;
      canvas.height = 150;
      let context = canvas.getContext("2d");
      let offsetPositionX = (canvas.width - width) / 2;
      let offsetPositionY = (canvas.height - height) / 2;
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, offsetPositionX, offsetPositionY, width, height);
      let png = canvas.toDataURL();
      if (option === "copy") {
        enqueueSnackbar(i18n.t("affiliate.copied"), {
          variant: "success",
        });
        utility.copyImage(png);
      } else if (option === "download") {
        utility.downloadImage(png, "download.png");
      }
    };
    image.src = blobURL;
  };

  const commonprops = {
    account: account,
    general: general,
    affiliateLink: affiliateLink,
    handleBackClick: handleBackClick,
    handleCopyLink: handleCopyLink,
    handleCopyReferralID: handleCopyReferralID,
    handleQrAction: handleQrAction,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 13:
      case "13":
        return <Template13 {...commonprops} />;
      default:
        return <Template1 {...commonprops} />;
    }
  };

  return switchTemplate(config.accountTemplate);
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBrandAllAgent: () => dispatch(generalAction.getBrandAllAgent()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
