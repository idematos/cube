import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

interface Props {
  title: string
  actionElements: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 20px;
`

const Elements = styled.div`
  display: flex;
  gap: 20px;
`

function TitleOptions({ title, actionElements }: Props): ReactElement {
  return (
    <Container>
      <h1>{title}</h1>
      <Elements>{actionElements}</Elements>
    </Container>
  )
}

export default TitleOptions
