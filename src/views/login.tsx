import { ReactElement } from "react"

import { TbBox } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

import loginImage from "../assets/login-image.png"
import Button from "../components/button"
import Input from "../components/input"

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`

const CubeLogo = styled(TbBox)`
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  padding: 30px;
`

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 55%;
  gap: 40px;
`

const LoginImage = styled.img`
  width: 50%;
  height: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

function Login(): ReactElement {
  const navigate = useNavigate()

  return (
    <Container>
      <LoginContent>
        <CubeLogo />
        <LoginForm>
          <h1>Sign In</h1>
          <Input type="email" placeholder="name@mail.com" label="E-mail" />
          <Input type="password" placeholder="**********" label="Password" />
          <StyledButton onClick={() => navigate("/transactions")}>
            Sign In
          </StyledButton>
        </LoginForm>
      </LoginContent>
      <LoginImage src={loginImage} alt="Login" />
    </Container>
  )
}

export default Login
