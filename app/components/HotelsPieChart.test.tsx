import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { HotelsPieChart } from "@/components";
import { HotelsContextProvider, useHotels } from "@/contexts";
import { DataChartProps, Hotel, PieChartProps } from "@/types";
import { generateHotelCollection } from "@/utils";
import {
  DefaultizedPieValueType,
  PieChart,
  PieItemIdentifier,
} from "@mui/x-charts";

jest.mock("@mui/x-charts", () => ({
  BarChart: jest.fn(() => null),
  LineChart: jest.fn(() => null),
  PieChart: jest.fn((props) => {
    const { onClick } = props;
    return (
      <svg data-testid={"mocked-pie-chart"}>
        <path
          data-testid={"mocked-pie-chart-path"}
          onClick={(e) =>
            onClick(e, {} as PieItemIdentifier, {
              id: 1,
              label: "test",
              value: 1,
              formattedValue: "1",
              color: "red",
            })
          }
        />
      </svg>
    );
  }),
  ScatterChart: jest.fn(() => null),
  LineSeriesType: jest.fn(),
}));
jest.mock("@/components", () => ({
  ...jest.requireActual("@/components"),
  DataChart: jest.fn((props: DataChartProps) => {
    const { testId } = props;
    const { chartParams } = props as PieChartProps;
    const { dispatch } = useHotels();

    const onClickHandler = (
      event: React.MouseEvent<SVGPathElement, MouseEvent>,
      itemIdentifier: PieItemIdentifier,
      item: DefaultizedPieValueType
    ) => {
      if (typeof chartParams.onClick === "function") {
        chartParams.onClick(event, itemIdentifier, item);
      } else {
        dispatch({
          type: "filter-data",
          payload: { property: "nta", searchedValue: item.label || "test" },
        });
      }
    };

    return (
      <div data-testid={testId}>
        <PieChart {...chartParams} onClick={onClickHandler} />
      </div>
    );
  }),
}));
jest.mock("@/contexts", () => ({
  ...jest.requireActual("@/contexts"),
  useHotels: jest.fn(() => {
    const { data, error } = generateHotelCollection();
    const dispatch = jest.fn();

    return {
      state: {
        originalData: data,
        data: data,
        searchedKey: "parid",
        searchedValue: "",
        refresh: false,
        loading: true,
        error: error,
      },
      dispatch: jest.fn((action) => {
        console.log(action); // mocked dispatch never gets called for some reason. need to assert on console log
        dispatch(action);
      }),
    };
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderHotelsPieChart = () => {
  const { data, error } = generateHotelCollection();
  const refreshCollection = jest.fn();

  return render(
    <HotelsContextProvider
      collection={data}
      refreshCollection={refreshCollection}
      error={error}
    >
      <HotelsPieChart />
    </HotelsContextProvider>
  );
};

describe("HotelsPieChart", () => {
  it("renders without crashing", () => {
    const { getByTestId } = renderHotelsPieChart();
    expect(getByTestId("hotels-pie-chart")).toBeDefined();
    expect(getByTestId("hotels-pie-chart-data-chart")).toBeDefined();
    expect(getByTestId("mocked-pie-chart")).toBeDefined();
    expect(getByTestId("mocked-pie-chart-path")).toBeDefined();
  });

  it("displays the default chart title", () => {
    const { getByTestId } = renderHotelsPieChart();
    const chartTitle = getByTestId("hotels-pie-chart-title");
    expect(chartTitle).toBeDefined();
    expect(chartTitle.textContent).toBe("NYC Hotels by NTA");
  });

  it("toggles between different chart types", () => {
    const { getByTestId } = renderHotelsPieChart();
    const chartToggleGroup = getByTestId("hotels-pie-chart-toggle-group");
    const toggleButtons = chartToggleGroup.querySelectorAll("button");

    expect(toggleButtons[0].classList).toContain("Mui-selected");
    fireEvent.click(toggleButtons[1]);
    expect(toggleButtons[1].classList).toContain("Mui-selected");
  });

  it("renders different chart titles based on toggled chart types", () => {
    const { getByTestId } = renderHotelsPieChart();
    const chartTitle = getByTestId("hotels-pie-chart-title");
    const chartToggleGroup = getByTestId("hotels-pie-chart-toggle-group");
    const toggleButtons = chartToggleGroup.querySelectorAll("button");

    expect(chartTitle.textContent).toBe("NYC Hotels by NTA");
    fireEvent.click(toggleButtons[1]);
    expect(chartTitle.textContent).toBe("NYC Hotels by POSTCODE");
  });

  // test only passes if printing to console log and doing assertions there.
  // if attempting to use mocked dispatch function, the test never passes, even when seeing a console log
  it("calls dispatch when PieChart is clicked", async () => {
    const { getByTestId } = renderHotelsPieChart();

    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    fireEvent.click(getByTestId("mocked-pie-chart-path"));

    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "filter-data",
        payload: { property: "nta", searchedValue: "test" },
      })
    );

    logSpy.mockRestore();
  });
});
