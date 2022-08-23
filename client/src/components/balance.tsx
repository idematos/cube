import { ReactElement } from "react"

import { TbArrowUpCircle, TbArrowDownCircle } from "react-icons/tb"
import styled from "styled-components"

import FormatBrlCurrency from "./utils/formatBrlCurrency"

interface Props {
  value: number
  income: number
  expense: number
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`

const Footer = styled.div`
  display: flex;
  gap: 20px;
`

const FooterContent = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const IncomeIcon = styled(TbArrowUpCircle)`
  color: green;
`
const ExpenseIcon = styled(TbArrowDownCircle)`
  color: red;
`

function Balance({ value, income, expense }: Props): ReactElement {
  return (
    <Container>
      <h4>Total Balance</h4>
      <h1>{FormatBrlCurrency(value, "pt-BR", "BRL")}</h1>
      <Footer>
        <FooterContent>
          <IncomeIcon size={20} />
          <h4>{FormatBrlCurrency(income, "pt-BR", "BRL")}</h4>
        </FooterContent>
        <FooterContent>
          <ExpenseIcon size={20} />
          <h4>{FormatBrlCurrency(expense, "pt-BR", "BRL")}</h4>
        </FooterContent>
      </Footer>
    </Container>
  )
}

export default Balance
