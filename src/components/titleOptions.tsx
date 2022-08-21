import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

interface Props {
  title: string
  actionElement: ReactNode
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function TitleOptions({ title, actionElement }: Props): ReactElement {
  return (
    <Container>
      <h2>{title}</h2>
      {actionElement}
    </Container>
  )
}

export default TitleOptions
