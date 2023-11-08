"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { Hotel } from "@/types";

type Action =
  | { type: "refresh" }
  | { type: "stop-refresh" }
  | {
      type: "new-data";
      payload: { collection: Hotel[]; error: boolean };
    }
  | {
      type: "filter-data";
      payload: { property: keyof Hotel | undefined; searchedValue: string };
    };
type Dispatch = (action: Action) => void;
type ContextValue = {
  state: ContextProviderState;
  dispatch: Dispatch;
};
type ContextProviderState = {
  originalData: Hotel[];
  data: Hotel[];
  searchedKey: keyof Hotel;
  searchedValue: string;
  refresh: boolean;
  loading: boolean;
  error: boolean;
};
type ContextProviderProps = {
  children: React.ReactNode;
  collection: Hotel[];
  refreshCollection: () => Promise<void>;
  error: boolean;
};

const HotelsContext = createContext<ContextValue>({
  state: {
    originalData: [] as Hotel[],
    data: [] as Hotel[],
    searchedKey: "parid",
    searchedValue: "",
    refresh: false,
    loading: true,
    error: false,
  },
  dispatch: () => {},
} as ContextValue);

const hotelsContextReducer = (
  state: ContextProviderState,
  action: Action
): ContextProviderState => {
  switch (action.type) {
    case "refresh": {
      return { ...state, refresh: true, loading: true };
    }
    case "stop-refresh": {
      return { ...state, refresh: false, loading: false };
    }
    case "new-data": {
      const { collection, error } = action.payload;
      return {
        ...state,
        originalData: collection,
        data: collection,
        error: error,
      };
    }
    case "filter-data": {
      const { property, searchedValue } = action.payload;
      if (property === undefined) {
        return {
          ...state,
          data: state.originalData,
          searchedKey: "parid",
          searchedValue: "",
        };
      }
      const filteredData = state.data.filter((item) => {
        const val = item[property!];
        if (typeof val === "string") {
          return val.toLowerCase().includes(searchedValue.toLowerCase());
        } else if (typeof val === "number") {
          return val === parseInt(searchedValue, 10);
        }
        return true;
      });
      return {
        ...state,
        data: filteredData,
        searchedKey: property,
        searchedValue: searchedValue,
      };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

const HotelsContextProvider = ({
  children,
  collection,
  refreshCollection,
  error,
}: ContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(hotelsContextReducer, {
    originalData: collection,
    data: collection,
    searchedKey: "parid",
    searchedValue: "",
    refresh: false,
    loading: false,
    error: error,
  });

  useEffect(() => {
    dispatch({ type: "new-data", payload: { collection, error } });
  }, [collection, error]);

  useEffect(() => {
    if (state.refresh) {
      refreshCollection();
      dispatch({ type: "stop-refresh" });
    }
  }, [state.refresh, refreshCollection]);

  const value = { state, dispatch };

  return (
    <HotelsContext.Provider value={value}>{children}</HotelsContext.Provider>
  );
};

const useHotels = (): ContextValue => useContext(HotelsContext);

export { HotelsContextProvider, useHotels };
