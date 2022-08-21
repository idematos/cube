import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

import PageHeader from "./pageHeader"

interface Props {
  children: ReactNode
}

const Container = styled.div`
  background-color: var(--gray-100);
  height: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 30px;
`

function PageLayout({ children }: Props): ReactElement {
  return (
    <Container>
      <PageHeader />
      <Content>{children}</Content>
    </Container>
  )
}

export default PageLayout
