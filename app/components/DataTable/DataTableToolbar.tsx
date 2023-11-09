"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import FilterList from "@mui/icons-material/FilterList";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { DataTableColumn } from "@/types";

const ColumnSelectedMenuForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

type ColumnSelectedMenuProps = {
  label: string;
  searchInputValue: string;
  handleSearchInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBackToMenu: () => void;
  handleSubmitSearch: (event: React.FormEvent) => void;
};

const ColumnSelectedMenu = ({
  label,
  searchInputValue,
  handleSearchInputChange,
  handleBackToMenu,
  handleSubmitSearch,
}: ColumnSelectedMenuProps): JSX.Element => {
  return (
    <Stack spacing={2} paddingX={1}>
      <Box sx={styles.flexRow}>
        <Tooltip title={"Back"}>
          <IconButton
            onClick={handleBackToMenu}
            sx={styles.columnSelectedMenuIconBtn}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </Tooltip>
        <Typography variant="h6">{label}</Typography>
      </Box>
      <ColumnSelectedMenuForm
        onSubmit={(e) => {
          handleSubmitSearch(e);
          return false;
        }}
      >
        <TextField
          label={`Search ${label}`}
          value={searchInputValue}
          variant={"standard"}
          onChange={handleSearchInputChange}
        />
        <Button
          type={"submit"}
          variant="outlined"
          disabled={searchInputValue === ""}
        >
          Search
        </Button>
      </ColumnSelectedMenuForm>
    </Stack>
  );
};

type ColumnListMenuProps<T> = {
  columns: DataTableColumn<T>[];
  handleSelectColumn: (id: keyof T) => void;
};

const ColumnListMenu = <T,>({
  columns,
  handleSelectColumn,
}: ColumnListMenuProps<T>): JSX.Element => {
  return (
    <Stack>
      {columns.map((col, colIndex) => (
        <MenuItem
          key={`filter-${String(col.id)}-${colIndex}`}
          onClick={() => handleSelectColumn(col.id)}
        >
          {col.label} <KeyboardArrowRight />
        </MenuItem>
      ))}
    </Stack>
  );
};

type DataTableToolbarProps<T> = {
  tableTitle: string;
  columns: DataTableColumn<T>[];
  filterable?: boolean;
  handleApplyFilter: (
    property: keyof T | undefined,
    searchedValue: string
  ) => void;
  contextSearchKeyValue?: { searchedKey: keyof T; searchedValue: string };
};

const DataTableToolbar = <T,>({
  tableTitle,
  columns,
  filterable,
  handleApplyFilter,
  contextSearchKeyValue,
}: DataTableToolbarProps<T>): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentColumn, setCurrentColumn] = useState<keyof T>();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (contextSearchKeyValue === undefined) return;
    if (contextSearchKeyValue.searchedValue === "") return;

    setCurrentColumn(contextSearchKeyValue.searchedKey);
    setSearchValue(contextSearchKeyValue.searchedValue);
  }, [contextSearchKeyValue]);

  const open = Boolean(anchorEl);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleBackToMenu = () => {
    setSearchValue("");
    handleApplyFilter(undefined, "");
    setCurrentColumn(undefined);
  };

  const handleSelectColumn = (id: keyof T) => {
    setCurrentColumn(id);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    handleApplyFilter(currentColumn, searchValue);
  };

  return (
    <Toolbar sx={styles.toolbar}>
      <Typography id="data-table-title" variant="h6" sx={styles.toolbarTitle}>
        {tableTitle}
      </Typography>
      {filterable && (
        <Box sx={{ ...styles.flexRow, gap: 1 }}>
          {contextSearchKeyValue?.searchedValue && (
            <Tooltip title={"Clear Filter"}>
              <IconButton onClick={handleBackToMenu}>
                <Close />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title={"Filter Options"}>
            <IconButton
              onClick={handleOpenFilterMenu}
              aria-controls={
                open ? `${tableTitle}-data-table-filter` : undefined
              }
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <FilterList />
            </IconButton>
          </Tooltip>
          <Menu
            id={`${tableTitle}-data-table-filter`}
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseFilterMenu}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {currentColumn ? (
              <ColumnSelectedMenu
                label={columns.find((col) => col.id === currentColumn)!!.label}
                searchInputValue={searchValue}
                handleSearchInputChange={handleSearchInputChange}
                handleBackToMenu={handleBackToMenu}
                handleSubmitSearch={handleSubmitSearch}
              />
            ) : (
              <ColumnListMenu
                columns={columns}
                handleSelectColumn={handleSelectColumn}
              />
            )}
          </Menu>
        </Box>
      )}
    </Toolbar>
  );
};

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  columnSelectedMenuIconBtn: {
    pl: 0,
  },
  toolbar: {
    gap: 1,
  },
  toolbarTitle: {
    flex: "1 1 100%",
  },
};

export default DataTableToolbar;
