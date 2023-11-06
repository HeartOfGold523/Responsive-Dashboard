import { DataTableColumnOrder } from "@/types";

const descendingComparator = <T>(
  a: T,
  b: T,
  orderBy: keyof T | undefined
): 1 | -1 | 0 => {
  if (orderBy === undefined) {
    return 0;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = <T>(
  order: DataTableColumnOrder,
  orderBy: keyof T | undefined
): ((a: T, b: T) => number) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = <T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
): T[] => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
