"use client";
import React from "react";

import { DataTable } from "@/components";
import { useHotels } from "@/contexts";
import { DataTableColumn, Hotel } from "@/types";

const keys: Array<keyof Hotel> = [
  "parid",
  "borocode",
  "block",
  "lot",
  "taxyear",
  "street_num",
  "street_name",
  "postcode",
  "bldg_class",
  "taxclass",
  "owner_name",
  "borough",
  "latitude",
  "longitude",
  "community_board",
  "council_district",
  "census_tract",
  "bin",
  "bbl",
  "nta",
];

const getColumnLabel = (key: keyof Hotel): string => {
  switch (key) {
    case "taxyear":
      return "tax year".toLocaleUpperCase();
    case "street_num":
      return "street number".toLocaleUpperCase();
    case "street_name":
      return "street name".toLocaleUpperCase();
    case "postcode":
      return "post code".toLocaleUpperCase();
    case "bldg_class":
      return "building class".toLocaleUpperCase();
    case "taxclass":
      return "tax class".toLocaleUpperCase();
    case "owner_name":
      return "owner name".toLocaleUpperCase();
    case "community_board":
      return "community board".toLocaleUpperCase();
    case "council_district":
      return "council district".toLocaleUpperCase();
    case "census_tract":
      return "census tract".toLocaleUpperCase();
    default:
      return key.toLocaleUpperCase();
  }
};

const getColumns = (): DataTableColumn<Hotel>[] => {
  const columns = keys.map((key): DataTableColumn<Hotel> => {
    switch (key) {
      // can customize different columns here
      default:
        return {
          id: key,
          align: "left",
          maxWidth: 50,
          disabledPadding: false,
          label: getColumnLabel(key),
        };
    }
  });
  return columns;
};

const HotelsDataTable = (): JSX.Element => {
  const {
    state: { data, loading, error, searchedKey, searchedValue },
    dispatch,
  } = useHotels();

  const dispatchFilter = (
    property: keyof Hotel | undefined,
    searchedValue: string
  ) => {
    dispatch({ type: "filter-data", payload: { property, searchedValue } });
  };

  const tableTitle =
    searchedValue === ""
      ? "Hotels"
      : `Hotels filtered by ${String(searchedKey).toLocaleUpperCase()}`;

  const columns = getColumns();

  return (
    <DataTable
      tableTitle={tableTitle}
      loading={loading}
      error={error}
      data={data}
      columns={columns}
      rowId={["parid", "taxyear"]}
      rowsPerPageOptions={[5, 10, 25]}
      defaultOrderBy={"parid"}
      collapsible
      filterable
      dispatchFilter={dispatchFilter}
      contextSearchKeyValue={{ searchedKey, searchedValue }}
    />
  );
};

export default HotelsDataTable;
