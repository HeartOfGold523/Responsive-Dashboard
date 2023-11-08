"use client";
import React, { useState } from "react";
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";

import { DataChart } from "@/components";
import { useHotels } from "@/contexts";
import { Hotel } from "@/types";

type HotelBarChartData = { label: string; value: number };
type HotelBarChartKey = { key: keyof Hotel; label: string };

const HotelsBarChart = (): JSX.Element => {
  const [chartType, setChartType] = useState(0);
  const {
    state: { originalData, loading, error },
    dispatch,
  } = useHotels();

  const handleChangeChartType = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newChartType: number
  ) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const reduceHotels = (key: keyof Hotel): HotelBarChartData[] => {
    return originalData.reduce((acc, curr) => {
      if (curr[key] === undefined) return acc;

      const label = String(curr[key]);
      const found = acc.findIndex((item) => item.label === label);

      if (found !== -1) {
        acc[found].value++;
      } else {
        acc.push({ label: label, value: 1 });
      }

      return acc;
    }, [] as HotelBarChartData[]);
  };

  const chartKeys: HotelBarChartKey[] = [
    { key: "community_board", label: "COMMUNITY BOARD" },
    { key: "bldg_class", label: "BUILDING CLASS" },
  ];

  const reducedData = chartKeys.map((item) => reduceHotels(item.key));

  return (
    <Box component={Paper} sx={styles.box}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Typography variant="h6" sx={styles.toolbarTitle}>
          {`NYC Hotels by ${chartKeys[chartType].label}`}
        </Typography>
        <ToggleButtonGroup
          value={chartType}
          exclusive
          onChange={handleChangeChartType}
          aria-label="NYC Hotels Pie Chart"
        >
          {chartKeys.map((item, index) => (
            <ToggleButton
              key={String(item.key) + index}
              value={index}
              aria-label={item.label}
            >
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Toolbar>
      <DataChart
        chartType={"bar"}
        chartParams={{
          height: 500,
          xAxis: [
            {
              scaleType: "band",
              data: reducedData[chartType].map((data) => data.label),
            },
          ],
          series: [
            {
              data: reducedData[chartType].map((data) => data.value),
              label: chartKeys[chartType].label,
              highlightScope: { faded: "global", highlighted: "item" },
            },
          ],
        }}
      />
    </Box>
  );
};

const styles = {
  box: {
    width: "100%",
    p: 2,
    bgcolor: "rgba(255, 255, 255, 0.8)",
  },
  toolbar: {
    gap: 1,
  },
  toolbarTitle: {
    flex: "1 1 100%",
  },
};

export default HotelsBarChart;
