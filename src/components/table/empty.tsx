import { ReactElement } from "react"

import { TbFilesOff } from "react-icons/tb"
import styled from "styled-components"

interface Props {
  title: string
  subtitle: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border-radius: 10px;
  gap: 20px;
  flex-grow: 1;
`

const NoDataIcon = styled(TbFilesOff)`
  color: var(--gray-200);
`

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--gray-500);
`

const Subtitle = styled.span`
  font-size: 1rem;
  color: var(--gray-400);
`

function Empty({ title, subtitle }: Props): ReactElement {
  return (
    <Container>
      <NoDataIcon size={70} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}

export default Empty
