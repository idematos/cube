import React, { ReactElement } from "react"

import get from "lodash/get"
import { TbSquareDot } from "react-icons/tb"
import styled, { css } from "styled-components"

import FormatBrlCurrency from "../utils/formatBrlCurrency"
import Empty from "./empty"

export interface TableRow {
  [key: string]: string | number
}

interface Props {
  emptyTitle: string
  emptySubtitle: string
  rows?: TableRow[] | null
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

const StyledTd = css`
  display: flex;
  align-items: center;
  padding: 25px;
  font-size: 16px;
  color: var(--gray-500);
  width: 100%;
`

const StyledData = styled.td`
  ${StyledTd};
`

const StyledId = styled.td`
  ${StyledTd};
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-400);
`

const StyledSeller = styled.td`
  ${StyledTd};
  font-size: 14px;
`

const StyledProduct = styled.td`
  ${StyledTd};
  font-size: 14px;
`

const StyledValue = styled.td`
  ${StyledTd};
  font-weight: 600;
  color: var(--dark-blue);
`

const StyledIncomeIcon = styled(TbSquareDot)`
  color: green;
  padding-right: 5px;
`

const StyledExpenseIcon = styled(TbSquareDot)`
  color: red;
  padding-right: 5px;
`

function Table({ emptyTitle, emptySubtitle, rows }: Props): ReactElement {
  const hasData = rows && rows.length
  const expenseTypeId = 3

  return hasData ? (
    <StyledTable>
      <Header>
        <StyledRow>
          <HeaderRow key={0}>ID</HeaderRow>
          <HeaderRow key={1}>Date</HeaderRow>
          <HeaderRow key={2}>Type</HeaderRow>
          <HeaderRow key={3}>Seller</HeaderRow>
          <HeaderRow key={4}>Product</HeaderRow>
          <HeaderRow key={5}>Value</HeaderRow>
        </StyledRow>
      </Header>

      <Body>
        {rows.map((row, arrIdx) => (
          <StyledRow key={arrIdx}>
            <StyledId key={0}>#{get(row, "id")}</StyledId>

            <StyledData key={1}>{get(row, "date")}</StyledData>

            <StyledData key={2}>
              {get(row, "typeId") === expenseTypeId ? (
                <StyledExpenseIcon size={25} />
              ) : (
                <StyledIncomeIcon size={25} />
              )}
              {get(row, "type.description")}
            </StyledData>

            <StyledSeller key={3}>{get(row, "sellerName")}</StyledSeller>

            <StyledProduct key={4}>
              {get(row, "productDescription")}
            </StyledProduct>

            <StyledValue key={5}>
              {get(row, "typeId") === expenseTypeId ? <>- </> : <>+ </>}
              {FormatBrlCurrency(+get(row, "value"), "pt-BR", "BRL")}
            </StyledValue>
          </StyledRow>
        ))}
      </Body>
    </StyledTable>
  ) : (
    <Empty title={emptyTitle} subtitle={emptySubtitle} />
  )
}

export default Table
