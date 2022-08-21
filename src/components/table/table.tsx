import React, { ReactElement, useEffect, useState } from "react"

import styled from "styled-components"

import Empty from "./empty"

export interface Props {
  rows: any[]
  columns?: {
    name: string
    label: string
  }[]
}

const StyledTable = styled.table`
  display: flex;
  flex-direction: column;
  background-color: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  padding: 25px;
  min-height: 0;
  flex-grow: 1;
`

const Header = styled.thead`
  position: sticky;
`

const HeaderRow = styled.th`
  display: flex;
  width: 100%;
  padding: 15px;
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-400);
  background-color: var(--white);
`

const Body = styled.tbody`
  overflow-y: scroll;
`

const StyledRow = styled.tr`
  display: flex;
  height: 50px;
  border-bottom: 1px solid var(--gray-200);
  color: var(--gray-700);

  :hover {
    background-color: var(--purple-100);
  }
`

const StyledData = styled.td`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px;
  font-size: 14px;
`

function Table({ rows, columns }: Props): ReactElement {
  const hasData = !!rows.length

  const [arr, setArr] = useState<any[]>(rows)

  useEffect(() => {
    setArr(rows)
  }, [])

  return hasData ? (
    <StyledTable>
      <Header>
        <StyledRow>
          {columns?.map((column) => (
            <HeaderRow key={column.name}>{column.label}</HeaderRow>
          ))}
        </StyledRow>
      </Header>

      <Body>
        {arr.map((row, arrIdx) => (
          <StyledRow key={arrIdx}>
            {columns?.map((column, colIdx) => {
              return <StyledData key={colIdx}>{row[column.name]}</StyledData>
            })}
          </StyledRow>
        ))}
      </Body>
    </StyledTable>
  ) : (
    <Empty />
  )
}

export default Table
