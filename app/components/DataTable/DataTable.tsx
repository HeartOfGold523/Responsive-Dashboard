"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";

import {
  DataTableColumn,
  DataTableColumnOrder,
  DataTableRowsOptions,
} from "@/types";
import { getComparator, stableSort } from "@/utils";

type DataTableHeadProps<T> = {
  columns: Array<DataTableColumn<T>>;
  onRequestSort: (
    event: React.MouseEvent<HTMLSpanElement>,
    property: keyof T
  ) => void;
  order: DataTableColumnOrder;
  orderBy?: keyof T;
};

const DataTableHead = <T,>({
  columns,
  onRequestSort,
  order,
  orderBy,
}: DataTableHeadProps<T>): JSX.Element => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<HTMLSpanElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {columns.map((col, index) => (
          <TableCell
            key={`head-${String(col.id)}-${index}`}
            align={col.numeric ? "right" : "left"}
            padding={col.disabledPadding ? "none" : "normal"}
            sortDirection={orderBy && orderBy === col.id ? order : false}
          >
            <TableSortLabel
              active={orderBy && orderBy === col.id}
              direction={orderBy && orderBy === col.id ? order : "asc"}
              onClick={createSortHandler(col.id)}
            >
              {col.label}
              {orderBy && orderBy === col.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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

type DataTableFooterProps = {
  rowsPerPageOptions: DataTableRowsOptions[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const DataTableFooter = (props: DataTableFooterProps): JSX.Element => {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          {...props}
          SelectProps={{
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          }}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  data: Array<T>;
  rowId: keyof T;
  defaultOrderBy?: keyof T;
};

const DataTable = <T,>({
  columns,
  data,
  rowId,
  defaultOrderBy,
}: DataTableProps<T>): JSX.Element => {
  const [order, setOrder] = useState<DataTableColumnOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(defaultOrderBy);
  // const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<HTMLSpanElement>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort<T>(data, getComparator<T>(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [data, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box>
      <Paper sx={styles.paper}>
        <TableContainer>
          <Table size={dense ? "small" : "medium"}>
            <DataTableHead
              columns={columns}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                return (
                  <TableRow
                    key={`row-${String(rowId)}-${index}`}
                    hover
                    tabIndex={-1}
                    sx={styles.tableRow}
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={`cell-${String(rowId)}-${index}-${colIndex}`}
                        align={col.numeric ? "right" : "left"}
                      >
                        {row[col.id] as React.ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: dense ? 33 : 53 * emptyRows,
                  }}
                >
                  <TableCell sx={styles.emptyCell} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <DataTableFooter
          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

const styles = {
  paper: {
    mb: 2,
  },
  tableRow: {
    cursor: "pointer",
  },
  emptyCell: {
    borderBottom: "none",
  },
};

export default DataTable;
