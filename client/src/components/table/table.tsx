import React, { ReactElement } from "react"

import get from "lodash/get"
import styled from "styled-components"

import Empty from "./empty"

export interface TableRow {
  [key: string]: string | number
}

export interface TableColumn {
  path: string
  label: string
}

interface Props {
  emptyTitle: string
  emptySubtitle: string
  rows?: TableRow[] | null
  columns?: TableColumn[]
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
  padding: 25px;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-400);
  background-color: var(--white);
  width: 100%;
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
}: Props): ReactElement {
  const hasData = rows && rows.length

  return hasData ? (
    <StyledTable>
      <Header>
        <StyledRow>
          {columns?.map((column) => (
            <HeaderRow key={column.path}>{column.label}</HeaderRow>
          ))}
        </StyledRow>
      </Header>

      <Body>
        {rows.map((row, arrIdx) => (
          <StyledRow key={arrIdx}>
            {columns?.map((column, colIdx) => (
              <StyledData key={colIdx}>{get(row, column.path)}</StyledData>
            ))}
          </StyledRow>
        ))}
      </Body>
    </StyledTable>
  ) : (
    <Empty title={emptyTitle} subtitle={emptySubtitle} />
  )
}

export default Table
