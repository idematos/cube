import { ReactElement, ReactNode } from "react"

import styled from "styled-components"

import PageHeader from "./pageHeader"
import TitleOptions from "./titleOptions"

interface Props {
  title: string
  actionElement: ReactNode
  children: ReactNode
}

const Container = styled.div`
  background-color: var(--gray-100);
  height: 100%;
  display: flex;
  flex-direction: column;
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  min-height: 0;
  gap: 30px;
  flex-grow: 1;
`

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex-grow: 1;
`

function PageLayout({ title, actionElement, children }: Props): ReactElement {
  return (
    <Container>
      <PageHeader />
      <PageContent>
        <TitleOptions title={title} actionElement={actionElement} />
        <PageBody>{children}</PageBody>
      </PageContent>
    </Container>
  )
}

export default PageLayout
