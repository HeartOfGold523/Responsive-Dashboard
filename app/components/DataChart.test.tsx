import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { DataChart } from "@/components";
import { DataChartProps } from "@/types";
import { generateDataChartParams } from "@/utils";

jest.mock("@mui/x-charts", () => ({
  BarChart: jest.fn(() => null),
  LineChart: jest.fn(() => null),
  PieChart: jest.fn(() => null),
  ScatterChart: jest.fn(() => null),
  LineSeriesType: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderDataChart = (chartType: DataChartProps["chartType"]) => {
  const dataChartParams = generateDataChartParams();

  switch (chartType) {
    case "area":
    case "line":
      return render(
        <DataChart
          chartType={chartType}
          chartParams={dataChartParams.line}
          testId={`${chartType}-chart`}
        />
      );
    case "bar":
      return render(
        <DataChart
          chartType={"bar"}
          chartParams={dataChartParams.bar}
          testId={"bar-chart"}
        />
      );
    case "pie":
      return render(
        <DataChart
          chartType={"pie"}
          chartParams={dataChartParams.pie}
          testId={"pie-chart"}
        />
      );
    case "scatter":
      return render(
        <DataChart
          chartType={"scatter"}
          chartParams={dataChartParams.scatter}
          testId={"scatter-chart"}
        />
      );
    default:
      throw new Error(`Unsupported chart type: ${chartType}`);
  }
};

describe("DataChart", () => {
  it("renders an area chart", () => {
    const { getByTestId } = renderDataChart("area");
    expect(getByTestId("area-chart")).toBeTruthy();
  });

  it("renders a line chart", () => {
    const { getByTestId } = renderDataChart("line");
    expect(getByTestId("line-chart")).toBeTruthy();
  });

  it("renders a bar chart", () => {
    const { getByTestId } = renderDataChart("bar");
    expect(getByTestId("bar-chart")).toBeTruthy();
  });

  it("renders a pie chart", () => {
    const { getByTestId } = renderDataChart("bar");
    expect(getByTestId("bar-chart")).toBeTruthy();
  });

  it("renders a scatter chart", () => {
    const { getByTestId } = renderDataChart("scatter");
    expect(getByTestId("scatter-chart")).toBeTruthy();
  });
});
