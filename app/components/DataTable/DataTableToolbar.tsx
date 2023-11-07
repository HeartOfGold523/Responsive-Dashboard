"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import FilterList from "@mui/icons-material/FilterList";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { DataTableColumn } from "@/types";

type ColumnSelectedMenuProps = {
  label: string;
  searchInputValue: string;
  handleSearchInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleBackToMenu: () => void;
  handleSubmitSearch: () => void;
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
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Tooltip title={"Back"}>
          <IconButton onClick={handleBackToMenu} sx={{ pl: 0 }}>
            <KeyboardArrowLeft />
          </IconButton>
        </Tooltip>
        <Typography variant="h6">{label}</Typography>
      </Box>
      <TextField
        label={`Search ${label}`}
        value={searchInputValue}
        variant={"standard"}
        onChange={handleSearchInputChange}
      />
      <Button
        variant="outlined"
        disabled={searchInputValue === ""}
        onClick={handleSubmitSearch}
      >
        Search
      </Button>
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
};

const DataTableToolbar = <T,>({
  tableTitle,
  columns,
  filterable,
  handleApplyFilter,
}: DataTableToolbarProps<T>): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentColumn, setCurrentColumn] = useState<keyof T>();
  const [searchValue, setSearchValue] = useState("");
  const [showClearFilters, setShowClearFilters] = useState(false);

  const open = Boolean(anchorEl);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
  };

  const handleBackToMenu = () => {
    setSearchValue("");
    setShowClearFilters(false);
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

  const handleSubmitSearch = () => {
    setShowClearFilters(true);
    handleApplyFilter(currentColumn, searchValue);
  };

  return (
    <Toolbar>
      <Typography
        id="data-table-title"
        variant="h6"
        component="div"
        sx={{ flex: "1 1 100%" }}
      >
        {tableTitle}
      </Typography>
      {filterable && (
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={1}
        >
          {showClearFilters && (
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

export default DataTableToolbar;
