import get from "lodash/get"

import { TableRow } from "../table/table"

export type SortDirection = "asc" | "desc"

function getSign(direction: SortDirection): number {
  return direction === "asc" ? -1 : 1
}

export function stringSorter(
  rows: TableRow[],
  direction: SortDirection,
  label: string
): TableRow[] {
  const sign = getSign(direction)

  return [...rows].sort((a, b) =>
    (get(a, label) as string).toLowerCase() <
    (get(b, label) as string).toLowerCase()
      ? sign
      : -sign
  )
}

export function numberSorter(
  rows: TableRow[],
  direction: SortDirection,
  label: string
): TableRow[] {
  const sign = getSign(direction)

  return [...rows].sort(
    (a, b) =>
      -sign * (get(a, label) as number) + sign * (get(b, label) as number)
  )
}
