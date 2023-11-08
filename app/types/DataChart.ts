import {
  AxisConfig,
  BarSeriesType,
  CardinalDirections,
  DefaultizedPieValueType,
  LineSeriesType,
  PieItemIdentifier,
  PieSeriesType,
  PieValueType,
  ScatterSeriesType,
} from "@mui/x-charts";

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

export type BarChartProps = {
  chartType: "bar";
  chartParams: {
    height: number;
    margin?: CardinalDirections<number>;
    slotProps?: object;
    dataset?: { [key: string]: string | number | Date }[];
    xAxis?: MakeOptional<AxisConfig, "id">[];
    yAxis?: MakeOptional<AxisConfig, "id">[];
    series: MakeOptional<BarSeriesType, "type">[];
  };
};

export type LineChartProps = {
  chartType: "line" | "area";
  chartParams: {
    height: number;
    margin?: CardinalDirections<number>;
    slotProps?: object;
    series: MakeOptional<LineSeriesType, "type">[];
  };
};

export type ScatterChartProps = {
  chartType: "scatter";
  chartParams: {
    height: number;
    margin?: CardinalDirections<number>;
    slotProps?: object;
    series: MakeOptional<ScatterSeriesType, "type">[];
  };
};

export type PieChartProps = {
  chartType: "pie";
  chartParams: {
    height: number;
    margin?: CardinalDirections<number>;
    slotProps?: object;
    onClick?: (
      event: React.MouseEvent<SVGPathElement, MouseEvent>,
      itemIdentifier: PieItemIdentifier,
      item: DefaultizedPieValueType
    ) => void;
    series: MakeOptional<
      PieSeriesType<MakeOptional<PieValueType, "id">>,
      "type"
    >[];
  };
};
