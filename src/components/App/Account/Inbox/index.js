import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { inboxAction } from "../../../../api-services/actions/inboxAction";
import { InboxService } from "../../../../api-services/services/InboxService";
import { SHOWING_DIALOG } from "../../../../api-services/constant/actionType";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import Template13 from "./template13";
import Template1 from "./template1";

const Inbox = ({ getMessages, token, inbox, showDialog }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(10);

  const getInboxList = (page) => {
    getMessages(i18n.language, page + 1, limit);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage - 1);
    getInboxList(newPage - 1);
  };

  useEffect(() => {
    if (token != null) {
      getInboxList(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRowClick = (row) => {
    InboxService.UpdateReadMessage([row.id]).then((response) => {
      getInboxList(page);
    });
    setSelectedRecord(row);
    setOpenDialog(true);
  };

  const commonprops = {
    inbox: inbox,
    page: page,
    selected: selected,
    openDialog,
    selectedRecord,
    handleChangePage,
    handleRowClick,
    handleCloseDialog,
    showDialog,
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

  return switchTemplate(config.template);
};

const mapStateToProps = (state) => {
  return {
    inbox: state.account.inbox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    getMessages: (language, page, limit) =>
      dispatch(inboxAction.getMessages(language, page, limit, true, false)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
