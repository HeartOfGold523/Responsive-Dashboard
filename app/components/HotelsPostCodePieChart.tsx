"use client";
import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { PieChart, PieValueType } from "@mui/x-charts";

import { useHotels } from "@/contexts";

const HotelsPostCodePieChart = (): JSX.Element => {
  const {
    state: { data, loading, error },
  } = useHotels();

  const postCodeData = data
    .reduce((acc, curr) => {
      const label = String(curr.postcode);
      const found = acc.findIndex((item) => item.label === label);

      if (found !== -1) {
        acc[found].value++;
      } else {
        acc.push({ label: label, value: 1 });
      }

      return acc;
    }, [] as { label: string; value: number }[])
    .map((item, index) => ({ ...item, id: index }));

  return (
    <Box component={Paper} sx={{ width: "100%", p: 2 }}>
      <Typography variant="h6">Pie Chart</Typography>
      <PieChart
        height={500}
        series={[
          {
            data: postCodeData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 0,
          },
        }}
        margin={{
          left: 20,
          right: 20,
          bottom: 200,
        }}
      />
    </Box>
  );
};

export default HotelsPostCodePieChart;
