"use client";
import React, { Fragment, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";

import { default as DataTableControls } from "./DataTableControls";
import { default as DataTableHead } from "./DataTableHead";
import { default as DataTableToolbar } from "./DataTableToolbar";
import {
  DataTableColumn,
  DataTableColumnOrder,
  DataTableRowsOptions,
} from "@/types";
import { getComparator, stableSort } from "@/utils";

type DataTableProps<T> = {
  tableTitle: string;
  loading?: boolean;
  error?: boolean;
  columns: Array<DataTableColumn<T>>;
  data: Array<T>;
  rowId: Array<keyof T>;
  rowsPerPageOptions: DataTableRowsOptions[];
  defaultOrderBy?: keyof T;
  collapsible?: boolean;
  filterable?: boolean;
  dispatchFilter: (
    property: keyof T | undefined,
    searchedValue: string
  ) => void;
  contextSearchKeyValue?: { searchedKey: keyof T; searchedValue: string };
};

const DataTable = <T,>({
  tableTitle,
  loading,
  error,
  columns,
  data,
  rowId,
  rowsPerPageOptions,
  defaultOrderBy,
  collapsible,
  filterable,
  dispatchFilter,
  contextSearchKeyValue,
}: DataTableProps<T>): JSX.Element => {
  const [controlledColumns, setControlledColumns] =
    useState<Array<DataTableColumn<T>>>(columns);
  const [order, setOrder] = useState<DataTableColumnOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(defaultOrderBy);
  const [opened, setOpened] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(() =>
    typeof rowsPerPageOptions[0] === "object"
      ? rowsPerPageOptions[0].value
      : rowsPerPageOptions[0]
  );

  const handleRequestSort = (
    event: React.MouseEvent<HTMLSpanElement>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    id: string
  ) => {
    const openedIndex = opened.indexOf(id);
    let newOpened: readonly string[] = [];

    if (openedIndex === -1) {
      newOpened = newOpened.concat(opened, id);
    } else if (openedIndex === 0) {
      newOpened = newOpened.concat(opened.slice(1));
    } else if (openedIndex === opened.length - 1) {
      newOpened = newOpened.concat(opened.slice(0, -1));
    } else if (openedIndex > 0) {
      newOpened = newOpened.concat(
        opened.slice(0, openedIndex),
        opened.slice(openedIndex + 1)
      );
    }
    setOpened(newOpened);
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
    setControlledColumns(
      event.target.checked
        ? columns.map((col) => ({
            ...col,
            disabledPadding: true,
          }))
        : columns
    );
  };

  const isOpened = (id: string) => opened.indexOf(id) !== -1;

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
    <Box component={Paper} sx={styles.box}>
      {loading && (
        <Box sx={styles.progressContainer}>
          <CircularProgress size={20} sx={styles.progress} />
        </Box>
      )}
      {error ? (
        <Box sx={styles.errorContainer}>
          <Typography>An error occurred</Typography>
        </Box>
      ) : (
        <>
          <Paper sx={styles.paper}>
            <DataTableToolbar
              tableTitle={tableTitle}
              columns={controlledColumns}
              filterable={filterable}
              handleApplyFilter={dispatchFilter}
              contextSearchKeyValue={contextSearchKeyValue}
            />
            <TableContainer>
              <Table
                size={dense ? "small" : "medium"}
                aria-labelledby="data-table-title"
              >
                <DataTableHead
                  columns={controlledColumns}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                  collapsible={collapsible}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const constructedId = rowId
                      .map((key) => String(row[key]))
                      .join("-");
                    const isItemOpened = isOpened(constructedId);

                    return (
                      <Fragment key={`row-${constructedId}-${index}`}>
                        <TableRow
                          hover
                          onClick={
                            collapsible
                              ? (event) => handleClick(event, constructedId)
                              : undefined
                          }
                          tabIndex={-1}
                          sx={styles.tableRow}
                        >
                          {collapsible && (
                            <TableCell padding="checkbox">
                              <IconButton aria-label="expand row" size="small">
                                {isItemOpened ? (
                                  <KeyboardArrowUp />
                                ) : (
                                  <KeyboardArrowDown />
                                )}
                              </IconButton>
                            </TableCell>
                          )}
                          {controlledColumns.map((col, colIndex) => (
                            <Tooltip
                              key={`cell-${constructedId}-${index}-${colIndex}`}
                              title={String(row[col.id])}
                            >
                              <TableCell
                                align={col.align}
                                component={colIndex === 0 ? "th" : undefined}
                                scope={colIndex === 0 ? "row" : undefined}
                                sx={{
                                  ...styles.tableCell,
                                  ...(col.disabledPadding && { p: 0 }),
                                  ...(col.maxWidth && {
                                    maxWidth: `${col.maxWidth}px`,
                                  }),
                                }}
                              >
                                {row[col.id] as React.ReactNode}
                              </TableCell>
                            </Tooltip>
                          ))}
                        </TableRow>
                        {collapsible && (
                          <TableRow>
                            <TableCell
                              colSpan={controlledColumns.length + 1}
                              sx={
                                isItemOpened
                                  ? styles.collapsibleCellOpened
                                  : styles.collapsibleCellClosed
                              }
                            >
                              <Collapse
                                in={isItemOpened}
                                timeout="auto"
                                unmountOnExit
                              >
                                {controlledColumns.map((col, colIndex) => (
                                  <Box
                                    key={`collapse-${constructedId}-${index}-${colIndex}`}
                                  >
                                    <Typography variant={"caption"}>
                                      {col.label}: &ensp;
                                      {row[col.id] as React.ReactNode}
                                    </Typography>
                                  </Box>
                                ))}
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: dense ? 33 : 53 * emptyRows,
                      }}
                    >
                      <TableCell
                        colSpan={
                          collapsible
                            ? controlledColumns.length + 1
                            : controlledColumns.length
                        }
                      />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <DataTableControls
            rowsPerPageOptions={rowsPerPageOptions}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            dense={dense}
            onChangeDense={handleChangeDense}
          />
        </>
      )}
    </Box>
  );
};

const styles = {
  box: {
    bgcolor: "rgba(255, 255, 255, 0.6)",
  },
  paper: {
    mb: 2,
    bgcolor: "inherit",
  },
  tableRow: {
    cursor: "pointer",
  },
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  collapsibleCellClosed: {
    p: 0,
  },
  collapsibleCellOpened: {},
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    my: "15px",
  },
  progress: {
    m: "10px",
  },
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    py: "15px",
  },
};

export default DataTable;
