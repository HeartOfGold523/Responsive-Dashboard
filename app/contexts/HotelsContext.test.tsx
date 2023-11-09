import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { HotelsContextProvider, useHotels } from "@/contexts";
import { Hotel } from "@/types";
import { generateHotelCollection } from "@/utils";

const TestComponent = () => {
  const { state, dispatch } = useHotels();

  return (
    <div>
      <p data-testid={"ogData"}>{JSON.stringify(state.originalData)}</p>
      <p data-testid={"data"}>{JSON.stringify(state.data)}</p>
      <p data-testid={"searchKey"}>{state.searchedKey}</p>
      <p data-testid={"searchVal"}>{state.searchedValue}</p>
      <p data-testid={"refresh"}>{state.refresh.toString()}</p>
      <p data-testid={"loading"}>{state.loading.toString()}</p>
      <p data-testid={"error"}>{state.error.toString()}</p>
      <button
        data-testid={"refresh-btn"}
        onClick={() => dispatch({ type: "refresh" })}
      >
        Refresh Data
      </button>
      <button
        data-testid={"new-data-btn"}
        onClick={() =>
          dispatch({
            type: "new-data",
            payload: {
              collection: state.originalData.slice(0, 1),
              error: false,
            },
          })
        }
      >
        Update Data
      </button>
      <button
        data-testid={"filter-data-btn"}
        onClick={() =>
          dispatch({
            type: "filter-data",
            payload: { property: "parid", searchedValue: "test" },
          })
        }
      >
        Filter Data
      </button>
    </div>
  );
};

afterEach(() => {
  jest.clearAllMocks();
});

const renderTestComponent = (
  customData?: Hotel[],
  customRefresh?: () => Promise<void>,
  customError?: boolean
) => {
  const { data: generatedData, error: generatedError } =
    generateHotelCollection();
  const collection = customData ? customData : generatedData;
  const refreshCollection = customRefresh
    ? customRefresh
    : jest.fn(() => Promise.resolve());
  const error = customError !== undefined ? customError : generatedError;

  return render(
    <HotelsContextProvider
      collection={collection}
      refreshCollection={refreshCollection}
      error={error}
    >
      <TestComponent />
    </HotelsContextProvider>
  );
};

describe("HotelsContext", () => {
  it("should render the default state values", () => {
    const { data, error } = generateHotelCollection();
    const { getByTestId } = renderTestComponent();

    expect(getByTestId("ogData")?.textContent).toBe(JSON.stringify(data));
    expect(getByTestId("data")?.textContent).toBe(JSON.stringify(data));
    expect(getByTestId("searchKey")?.textContent).toBe("parid");
    expect(getByTestId("searchVal")?.textContent).toBe("");
    expect(getByTestId("refresh")?.textContent).toBe("false");
    expect(getByTestId("loading")?.textContent).toBe("false");
    expect(getByTestId("error")?.textContent).toBe(error.toString());
  });

  it('should update state when "refresh" action is dispatched', () => {
    const { getByTestId } = renderTestComponent();
    const refresh = getByTestId("refresh");
    const loading = getByTestId("loading");
    const refreshBtn = getByTestId("refresh-btn");

    fireEvent.click(refreshBtn);

    expect(refresh?.textContent).toBe("true");
    expect(loading?.textContent).toBe("true");

    setTimeout(() => {
      expect(refresh?.textContent).toBe("false");
      expect(loading?.textContent).toBe("false");
    }, 5000);
  });

  it('should update state when "new-data" action is dispatched', () => {
    const { data } = generateHotelCollection();
    const { getByTestId } = renderTestComponent();
    const newDataBtn = getByTestId("new-data-btn");

    fireEvent.click(newDataBtn);

    expect(getByTestId("ogData")?.textContent).toBe(
      JSON.stringify(data.slice(0, 1))
    );
    expect(getByTestId("data")?.textContent).toBe(
      JSON.stringify(data.slice(0, 1))
    );
  });

  it('should update state when "filter-data" action is dispatched', () => {
    const { data } = generateHotelCollection();
    const { getByTestId } = renderTestComponent();
    const filterDataBtn = getByTestId("filter-data-btn");

    fireEvent.click(filterDataBtn);

    expect(getByTestId("ogData")?.textContent).toBe(JSON.stringify(data));
    expect(getByTestId("data")?.textContent).toBe(JSON.stringify([]));
  });
});
