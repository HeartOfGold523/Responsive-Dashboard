"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  ResponsiveChartContainer,
  LinePlot,
  useDrawingArea,
  PiePlot,
} from "@mui/x-charts";

const StyledPath = styled("path")(({ theme }) => ({
  fill: "none",
  stroke: theme.palette.text.primary,
  shapeRendering: "crispEdges",
  strokeWidth: 1,
  pointerEvents: "none",
}));

const StyledText = styled("text")(({ theme }) => ({
  stroke: "none",
  fill: theme.palette.text.primary,
  shapeRendering: "crispEdges",
}));

function DrawingAreaBox() {
  const { left, top, width, height } = useDrawingArea();
  return (
    <React.Fragment>
      <StyledPath
        d={`M ${left} ${top} l ${width} 0 l 0 ${height} l -${width} 0 Z`}
      />
      <circle cx={left} cy={top} r={3} style={{ fill: "red" }} />
      <circle
        cx={left + width}
        cy={top + height}
        r={3}
        style={{ fill: "red" }}
      />
      <StyledText
        x={left}
        y={top}
        textAnchor="start"
        dominantBaseline="text-after-edge"
      >
        ({left},{top})
      </StyledText>
      <StyledText
        x={left + width}
        y={top + height}
        textAnchor="end"
        dominantBaseline="text-before-edge"
      >
        ({left + width},{top + height})
      </StyledText>
    </React.Fragment>
  );
}
export default function BasicScaleDemo() {
  return (
    <ResponsiveChartContainer
      margin={{ top: 20, left: 10, right: 10, bottom: 30 }}
      height={300}
      series={[
        {
          // type: "line",
          // data: [13, 13, 54, 651, 657, 987, 64, 654, 954, 654, 897, 84],
          type: "pie",
          data: [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
          ],
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      // xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
    >
      {/* <LinePlot /> */}
      {/* <DrawingAreaBox /> */}
      <PiePlot />
    </ResponsiveChartContainer>
  );
}
