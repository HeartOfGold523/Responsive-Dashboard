"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import {
  BarChart,
  LineChart,
  LineSeriesType,
  PieChart,
  ScatterChart,
} from "@mui/x-charts";

import { MakeOptional, DataChartProps } from "@/types";

const DataChart = ({
  testId,
  chartType,
  chartParams,
}: DataChartProps): JSX.Element => {
  const getAreaChartSeries = () => {
    return chartParams.series.map((series) => ({
      ...series,
      area: true,
    })) as MakeOptional<LineSeriesType, "type">[];
  };

  return (
    <Stack data-testid={testId} spacing={1} sx={styles.stack}>
      <Box sx={styles.box}>
        {chartType === "bar" && <BarChart {...chartParams} />}
        {(chartType === "line" || chartType === "area") && (
          <LineChart
            {...chartParams}
            series={
              chartType === "area" ? getAreaChartSeries() : chartParams.series
            }
          />
        )}
        {chartType === "scatter" && <ScatterChart {...chartParams} />}
        {chartType === "pie" && <PieChart {...chartParams} />}
      </Box>
    </Stack>
  );
};

const styles = {
  stack: {
    width: "100%",
  },
  box: {
    flexGrow: 1,
  },
};

export default DataChart;
