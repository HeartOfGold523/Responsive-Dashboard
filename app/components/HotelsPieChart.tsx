"use client";
import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";

import { DataChart } from "@/components";
import { useHotels } from "@/contexts";
import { Hotel } from "@/types";

type HotelPieChartData = { id: number; label: string; value: number };
type HotelPieChartKey = { key: keyof Hotel; label: string };

const HotelsPieChart = (): JSX.Element => {
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

  const reduceHotels = (key: keyof Hotel): HotelPieChartData[] => {
    return originalData.reduce((acc, curr) => {
      if (curr[key] === undefined) return acc;

      const label = String(curr[key]);
      const found = acc.findIndex((item) => item.label === label);

      if (found !== -1) {
        acc[found].value++;
      } else {
        acc.push({ id: acc.length, label: label, value: 1 });
      }

      return acc;
    }, [] as HotelPieChartData[]);
  };

  const chartKeys: HotelPieChartKey[] = [
    { key: "nta", label: "NTA" },
    { key: "postcode", label: "POSTCODE" },
  ];

  const reducedData = chartKeys.map((item) => reduceHotels(item.key));

  return (
    <Box data-testid={"hotels-pie-chart"} component={Paper} sx={styles.box}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Typography
          data-testid={"hotels-pie-chart-title"}
          variant="h6"
          sx={styles.toolbarTitle}
        >
          {`Hotels by ${chartKeys[chartType].label}`}
        </Typography>
        {!error && (
          <ToggleButtonGroup
            data-testid={"hotels-pie-chart-toggle-group"}
            value={chartType}
            exclusive
            onChange={handleChangeChartType}
            aria-label="NYC Hotels Pie Chart"
          >
            {chartKeys.map((item, index) => (
              <ToggleButton
                data-testid={`hotels-pie-chart-toggle-button-${index}`}
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
          testId={"hotels-pie-chart-data-chart"}
          chartType={"pie"}
          chartParams={{
            height: 500,
            colors: [
              "#708090",
              "#C32148",
              "#191970",
              "#006400",
              "#9acd32",
              "#ff0000",
              "#ff8c00",
              "#ffd700",
              "#40e0d0",
              "#00ff00",
              "#ba55d3",
              "#00fa9a",
              "#0000ff",
              "#ff00ff",
              "#1e90ff",
              "#fa8072",
              "#dda0dd",
              "#ff1493",
              "#87cefa",
              "#ffdead",
            ],
            margin: {
              top: 0,
              right: 10,
              bottom: 200,
              left: 10,
            },
            slotProps: {
              legend: {
                direction: "row",
                position: { vertical: "bottom", horizontal: "middle" },
                padding: 0,
              },
            },
            onClick: (e, itemIdentifier, item) => {
              // clear filter before attempting to filter again
              dispatch({
                type: "filter-data",
                payload: {
                  property: undefined,
                  searchedValue: "",
                },
              });
              dispatch({
                type: "filter-data",
                payload: {
                  property: chartKeys[chartType].key,
                  searchedValue: item.label!,
                },
              });
            },
            series: [
              {
                data: reducedData[chartType],
                paddingAngle: 1,
                cornerRadius: 5,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
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

export default HotelsPieChart;
