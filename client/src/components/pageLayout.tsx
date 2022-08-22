import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

import HeaderBar from "./headerBar"
import TitleOptions from "./titleOptions"

interface Props {
  title: string
  actionElements: ReactNode[]
  children: ReactNode
}

const Container = styled.div`
  background-color: var(--white);
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  min-height: 0;
  gap: 50px;
  flex-grow: 1;
`

function PageLayout({ children, title, actionElements }: Props): ReactElement {
  return (
    <Container>
      <HeaderBar />
      <PageContent>
        <TitleOptions title={title} actionElements={actionElements} />
        {children}
      </PageContent>
    </Container>
  )
}

export default PageLayout
