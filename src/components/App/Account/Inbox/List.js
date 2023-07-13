import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import moment from "moment";

const StyledTableCell = withStyles((theme) => ({
  root: {
    fontFamily: 'Arial,"Microsoft Yahei", "微软雅黑"',
  },
  head: {
    color: "#747474",
    padding: "12px",
  },
  body: {
    fontSize: 14,
    padding: "5px 0 5px 10px",

    color: "#7b7b7b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const CustomTableCell = styled(StyledTableCell)`
  background: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#fff";
  }};
  color: ${({ theme }) => {
    return theme.darkMode ? "#fff" : "#000";
  }};
`;

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#dde3f6 !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

const InnerWrap = styled.div`
  float: left;
  box-sizing: border-box;
  width: 100%;
  width: -webkit-fill-available;
`;

const CustomTablePagination = styled(TablePagination)`
  color: #fff;

  .MuiIconButton-root {
    color: ${({ theme }) => {
      return theme.darkMode ? "#fff" : "#000";
    }};
    opacity: 0.5;
  }

  .MuiIconButton-root.Mui-disabled {
    opacity: 0.5;
  }
`;

function List(props) {
  const { inbox, selected, onhandleChangePage, onhandleRowClick, page } = props;

  const handleChangePage = (event, newPage) => {
    onhandleChangePage(newPage + 1);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <CustomTableCell style={{ width: "170px" }}>
              {i18n.t("inbox.dateTime")}
            </CustomTableCell>
            <CustomTableCell style={{ width: "200px" }}>
              {i18n.t("inbox.inboxTitle")}
            </CustomTableCell>
            <CustomTableCell>{i18n.t("inbox.details")}</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inbox.items.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            let doc = new DOMParser().parseFromString(
              row.localization?.content ?? row.content,
              "text/html"
            );

            return (
              <StyledTableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                onClick={() => onhandleRowClick(row)}
              >
                <CustomTableCell
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {moment(row.createon).format("YYYY-MM-DD hh:mm:ss a")}
                </CustomTableCell>
                <CustomTableCell
                  id={labelId}
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {row.localization?.subject ?? row.subject}
                </CustomTableCell>
                <CustomTableCell
                  style={
                    row.isread === false
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {doc.querySelector("p")?.textContent ?? ""}
                </CustomTableCell>
                <CustomTableCell
                  style={
                    row.status === 1
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                ></CustomTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <CustomTablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={inbox.totalcount}
        rowsPerPage={10}
        page={page}
        labelRowsPerPage={i18n.t("inbox.rowsPerPage")}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onChangePage={handleChangePage}
      />
    </InnerWrap>
  );
}

export default List;
