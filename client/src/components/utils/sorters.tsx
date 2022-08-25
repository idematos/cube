import get from "lodash/get"

import { TableRow } from "../table/table"

export type SortDirection = "asc" | "desc"

function getSign(direction: SortDirection): number {
  return direction === "asc" ? -1 : 1
}

export function stringSorter(
  rows: TableRow[],
  direction: SortDirection,
  path: string
): TableRow[] {
  const sign = getSign(direction)

  return [...rows].sort((a, b) =>
    (get(a, path) as string).toLowerCase() <
    (get(b, path) as string).toLowerCase()
      ? sign
      : -sign
  )
}

export function numberSorter(
  rows: TableRow[],
  direction: SortDirection,
  path: string
): TableRow[] {
  const sign = getSign(direction)

  return [...rows].sort(
    (a, b) => -sign * (get(a, path) as number) + sign * (get(b, path) as number)
  )
}
