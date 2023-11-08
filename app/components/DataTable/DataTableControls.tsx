"use client";
import React from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Switch,
  TablePagination,
} from "@mui/material";
import FirstPage from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPage from "@mui/icons-material/LastPage";

import { DataTableRowsOptions } from "@/types";

type TablePaginationActionsProps = {
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
};

const TablePaginationActions = (
  props: TablePaginationActionsProps
): JSX.Element => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={styles.tablePaginationActions}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

type DataTableControlsProps = {
  rowsPerPageOptions: DataTableRowsOptions[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dense: boolean;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataTableControls = (props: DataTableControlsProps): JSX.Element => {
  const { dense, onChangeDense, ...rest } = props;

  return (
    <Box sx={styles.dataTableControls}>
      <FormControlLabel
        control={<Switch checked={dense} onChange={onChangeDense} />}
        label="Dense padding"
      />
      <TablePagination
        component="div"
        {...rest}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        ActionsComponent={TablePaginationActions}
      />
    </Box>
  );
};

const styles = {
  dataTableControls: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", md: "center" },
    paddingLeft: 2,
  },
  tablePaginationActions: {
    flexShrink: 0,
    ml: 2.5,
  },
};

export default DataTableControls;
