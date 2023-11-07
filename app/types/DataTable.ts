export type DataTableColumnOrder = "asc" | "desc";

export type DataTableRowsOptions = number | { label: string; value: number };

export interface DataTableColumn<T> {
  id: keyof T;
  align?: "center" | "left" | "right" | "inherit" | "justify";
  maxWidth?: number;
  disabledPadding: boolean;
  label: string;
}
