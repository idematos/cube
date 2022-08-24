import React, { ReactElement, useState } from "react"

import get from "lodash/get"
import { TbArrowsSort } from "react-icons/tb"
import styled from "styled-components"

import { numberSorter, SortDirection, stringSorter } from "../utils/sorter"
import Empty from "./empty"

export interface TableRow {
  [key: string]: string | number
}

export interface TableColumn {
  raw: string
  formatted: string
  label: string
  isNumeric: boolean
}

interface ColumnSort {
  label: string
  direction: SortDirection
  isNumeric: boolean
}

interface Props {
  emptyTitle: string
  emptySubtitle: string
  rows: TableRow[]
  columns?: TableColumn[]
  isLoading?: boolean
}

const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex-grow: 1;
`

const Header = styled.thead`
  position: sticky;
`

const HeaderRow = styled.th`
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: 25px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-400);
  background-color: var(--white);
  gap: 5px;
  cursor: pointer;
`

const Body = styled.tbody`
  overflow-y: scroll;
`

const StyledRow = styled.tr`
  display: flex;
  height: 60px;
  border-bottom: 1px solid var(--gray-200);

  :hover {
    background-color: var(--gray-100);
    border-radius: 20px;
  }
`

const StyledData = styled.td`
  display: flex;
  align-items: center;
  padding: 25px;
  font-size: 16px;
  color: var(--gray-500);
  width: 100%;
`

function Table({
  emptyTitle,
  emptySubtitle,
  rows,
  columns,
  isLoading,
}: Props): ReactElement {
  const [columnSort, setColumnSort] = useState<ColumnSort | null>(null)

  const sortByColumn = (column: TableColumn): void => {
    let direction: SortDirection = "asc"
    if (columnSort?.label === column.raw)
      direction = columnSort.direction === "asc" ? "desc" : "asc"

    setColumnSort({
      label: column.raw,
      isNumeric: column.isNumeric,
      direction,
    })
  }

  let sortedRows = rows
  if (columnSort) {
    if (columnSort.isNumeric)
      sortedRows = stringSorter(rows, columnSort.direction, columnSort.label)
    else sortedRows = numberSorter(rows, columnSort.direction, columnSort.label)
  }

  return rows.length > 0 ? (
    <StyledTable>
      <Header>
        <StyledRow>
          {columns?.map((column) => (
            <HeaderRow key={column.raw} onClick={() => sortByColumn(column)}>
              {column.label}
              <TbArrowsSort size={15} />
            </HeaderRow>
          ))}
        </StyledRow>
      </Header>

      <Body>
        {sortedRows.map((row, rowIdx) => (
          <StyledRow key={rowIdx}>
            {columns?.map((column, colIdx) => (
              <StyledData key={colIdx}>{get(row, column.formatted)}</StyledData>
            ))}
          </StyledRow>
        ))}
      </Body>
    </StyledTable>
  ) : (
    <Empty title={emptyTitle} subtitle={emptySubtitle} loading={isLoading} />
  )
}

export default Table
