import { ReactElement } from "react"

import styled from "styled-components"

import FormatCurrency from "./utils/formatBrlCurrency"

interface Props {
  value: any
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
`

function Balance({ value }: Props): ReactElement {
  return (
    <Container>
      <h4>Total Balance</h4>
      <h1>{FormatCurrency(value, "pt-BR", "BRL")}</h1>
    </Container>
  )
}

export default Balance
