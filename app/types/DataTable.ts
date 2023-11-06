export type DataTableColumnOrder = "asc" | "desc";

export type DataTableRowsOptions = number | { label: string; value: number };

export interface DataTableColumn<T> {
  id: keyof T;
  numeric: boolean;
  disabledPadding: boolean;
  label: string;
}
