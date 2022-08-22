import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

import HeaderBar from "./headerBar"
import TitleOptions from "./titleOptions"

interface Props {
  title: string
  actionElements?: ReactNode
  rightElement?: ReactNode
  children?: ReactNode
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

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-grow: 1;
`

function PageLayout({
  children,
  title,
  actionElements,
  rightElement,
}: Props): ReactElement {
  return (
    <Container>
      <HeaderBar />
      <PageContent>
        <HeaderContent>
          <TitleOptions title={title} actionElements={actionElements} />
          {rightElement}
        </HeaderContent>
        {children}
      </PageContent>
    </Container>
  )
}

export default PageLayout
