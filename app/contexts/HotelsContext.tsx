"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";

import { Hotel } from "@/types";

type Action =
  | { type: "refresh" }
  | { type: "stop-refresh" }
  | {
      type: "new-data";
      payload: { collection: Hotel[]; error: boolean };
    };
type Dispatch = (action: Action) => void;
type ContextValue = {
  state: ContextProviderState;
  dispatch: Dispatch;
};
type ContextProviderState = {
  data: Hotel[];
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
  state: { data: [] as Hotel[], refresh: false, loading: true, error: false },
  dispatch: () => {},
} as ContextValue);

const testReducer = (
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
      return { ...state, data: collection, error: error };
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
  const [state, dispatch] = useReducer(testReducer, {
    data: collection,
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
