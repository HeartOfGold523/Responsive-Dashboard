"use client";
import React from "react";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { DataTableColumn, DataTableColumnOrder } from "@/types";

type DataTableHeadProps<T> = {
  columns: Array<DataTableColumn<T>>;
  onRequestSort: (
    event: React.MouseEvent<HTMLSpanElement>,
    property: keyof T
  ) => void;
  order: DataTableColumnOrder;
  orderBy?: keyof T;
  collapsible?: boolean;
};

const DataTableHead = <T,>({
  columns,
  onRequestSort,
  order,
  orderBy,
  collapsible,
}: DataTableHeadProps<T>): JSX.Element => {
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<HTMLSpanElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {collapsible && <TableCell />}
        {columns.map((col, index) => (
          <Tooltip key={`head-${String(col.id)}-${index}`} title={col.label}>
            <TableCell
              align={col.align}
              padding={col.disabledPadding ? "none" : "normal"}
              sortDirection={orderBy && orderBy === col.id ? order : false}
            >
              <TableSortLabel
                active={orderBy && orderBy === col.id}
                direction={orderBy && orderBy === col.id ? order : "asc"}
                onClick={createSortHandler(col.id)}
              >
                <Box
                  component="span"
                  sx={{
                    ...styles.tableCell,
                    ...(col.maxWidth && {
                      maxWidth: `${col.maxWidth}px`,
                    }),
                  }}
                >
                  {col.label}
                </Box>
                {orderBy && orderBy === col.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          </Tooltip>
        ))}
      </TableRow>
    </TableHead>
  );
};

const styles = {
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export default DataTableHead;
