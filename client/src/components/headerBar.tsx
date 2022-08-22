import { ReactElement } from "react"

import { TbBox } from "react-icons/tb"
import styled from "styled-components"

import Profile from "./profile"

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  border-bottom: 2px solid var(--gray-200);
  height: 20px;
  padding: 20px;
`

const LogoIcon = styled(TbBox)`
  color: var(--dark-blue);
`

function HeaderBar(): ReactElement {
  return (
    <Container>
      <LogoIcon size={35} />
      <Profile />
    </Container>
  )
}

export default HeaderBar
