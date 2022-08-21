import { ReactElement } from "react"

import { TbLogout } from "react-icons/tb"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const Name = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
`

const LogoutIcon = styled(TbLogout)`
  cursor: pointer;
  color: var(--dark-blue);
`

function Profile(): ReactElement {
  return (
    <Container>
      <Name>Art Vandelay</Name>
      <Link to="/">
        <LogoutIcon size={25} />
      </Link>
    </Container>
  )
}

export default Profile
