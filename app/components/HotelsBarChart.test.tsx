import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { HotelsBarChart } from "@/components";
import { HotelsContextProvider } from "@/contexts";
import { Hotel } from "@/types";
import { generateHotelCollection } from "@/utils";

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

const renderHotelsBarChart = (
  customData?: Hotel[],
  customRefresh?: () => Promise<void>,
  customError?: boolean
) => {
  const { data: generatedData, error: generatedError } =
    generateHotelCollection();
  const collection = customData ? customData : generatedData;
  const refreshCollection = customRefresh ? customRefresh : async () => {};
  const error = customError !== undefined ? customError : generatedError;

  return render(
    <HotelsContextProvider
      collection={collection}
      refreshCollection={refreshCollection}
      error={error}
    >
      <HotelsBarChart />
    </HotelsContextProvider>
  );
};

describe("HotelsPieChart", () => {
  it("renders without crashing", () => {
    const { getByTestId } = renderHotelsBarChart();
    expect(getByTestId("hotels-bar-chart")).toBeDefined();
  });

  it("displays the default chart title", () => {
    const { getByTestId } = renderHotelsBarChart();
    const chartTitle = getByTestId("hotels-bar-chart-title");
    expect(chartTitle).toBeDefined();
    expect(chartTitle.textContent).toBe("Hotels by COMMUNITY BOARD");
  });

  it("toggles between different chart types", () => {
    const { getByTestId } = renderHotelsBarChart();
    const chartToggleGroup = getByTestId("hotels-bar-chart-toggle-group");
    const toggleButtons = chartToggleGroup.querySelectorAll("button");

    expect(toggleButtons[0].classList).toContain("Mui-selected");
    fireEvent.click(toggleButtons[1]);
    expect(toggleButtons[1].classList).toContain("Mui-selected");
  });

  it("renders different chart titles based on toggled chart types", () => {
    const { getByTestId } = renderHotelsBarChart();
    const chartTitle = getByTestId("hotels-bar-chart-title");
    const chartToggleGroup = getByTestId("hotels-bar-chart-toggle-group");
    const toggleButtons = chartToggleGroup.querySelectorAll("button");

    expect(chartTitle.textContent).toBe("Hotels by COMMUNITY BOARD");
    fireEvent.click(toggleButtons[1]);
    expect(chartTitle.textContent).toBe("Hotels by BUILDING CLASS");
  });
});
