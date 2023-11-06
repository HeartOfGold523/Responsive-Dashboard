"use client";
import React from "react";

import { DataTable } from "@/components";
import { useHotels } from "@/contexts";
import { Hotel } from "@/types";

const HotelsDataTable = (): JSX.Element => {
  const {
    state: { data, loading, error },
  } = useHotels();

  const columns = [
    {
      id: "borocode" as keyof Hotel,
      numeric: true,
      disabledPadding: false,
      label: "borocode",
    },
  ];

  return <DataTable data={data} columns={columns} rowId={columns[0].id} />;
};

export default HotelsDataTable;
