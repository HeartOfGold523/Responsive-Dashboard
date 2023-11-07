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
      case "borocode":
      case "block":
      case "lot":
      case "taxyear":
      case "taxclass":
      case "latitude":
      case "longitude":
      case "community_board":
      case "council_district":
      case "census_tract":
      case "bin":
      case "bbl":
        return {
          id: key,
          align: "right",
          maxWidth: 50,
          disabledPadding: false,
          label: getColumnLabel(key),
        };
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
    state: { data, loading, error },
  } = useHotels();
  const columns = getColumns();

  return (
    <DataTable
      tableTitle={"NYC Hotels"}
      data={data}
      columns={columns}
      rowId={"parid"}
      rowsPerPageOptions={[5, 10, 25]}
      defaultOrderBy={"borocode"}
      collapsible
      filterable
    />
  );
};

export default HotelsDataTable;
