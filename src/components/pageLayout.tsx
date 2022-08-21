import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

import PageHeader from "./pageHeader"

interface Props {
  children: ReactNode
}

const Container = styled.div`
  background-color: var(--gray-100);
  width: 100%;
  height: 100%;
  display: flex;
`

function PageLayout({ children }: Props): ReactElement {
  return (
    <Container>
      <PageHeader />
      {children}
    </Container>
  )
}

export default PageLayout
