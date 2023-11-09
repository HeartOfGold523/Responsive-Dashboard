"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
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
    <Box data-testid={"hotels-bar-chart"} component={Paper} sx={styles.box}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Typography
          data-testid={"hotels-bar-chart-title"}
          variant="h6"
          sx={styles.toolbarTitle}
        >
          {`Hotels by ${chartKeys[chartType].label}`}
        </Typography>
        {!error && (
          <ToggleButtonGroup
            data-testid={"hotels-bar-chart-toggle-group"}
            value={chartType}
            exclusive
            onChange={handleChangeChartType}
            aria-label="NYC Hotels Pie Chart"
          >
            {chartKeys.map((item, index) => (
              <ToggleButton
                data-testid={`hotels-bar-chart-toggle-button-${index}`}
                key={String(item.key) + index}
                value={index}
                aria-label={item.label}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Toolbar>
      {loading && (
        <Box sx={styles.progressContainer}>
          <CircularProgress size={20} sx={styles.progress} />
        </Box>
      )}
      {error ? (
        <Box sx={styles.progressContainer}>
          <Typography>An error occurred</Typography>
        </Box>
      ) : (
        <DataChart
          testId={"hotels-bar-chart-data-chart"}
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
      )}
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
    flexDirection: { xs: "column", md: "row" },
    mb: { xs: 2, md: 0 },
    textAlign: { xs: "center", md: "left" },
  },
  toolbarTitle: {
    flex: "1 1 100%",
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    my: "15px",
  },
  progress: {
    m: "10px",
  },
};

export default HotelsBarChart;
