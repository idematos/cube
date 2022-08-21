import React, { ReactElement, useState } from "react"

import { TbEye, TbEyeOff } from "react-icons/tb"
import styled, { css } from "styled-components"

interface Props {
  label: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  width: 100%;
`

const Label = styled.label`
  display: flex;
  color: var(--dark-blue);
  font-size: 14px;
  font-weight: 600;
`

const InputRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 4px 12px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid var(--gray-300);
  transition: all 0.2s ease-in-out;
  color: var(--gray-500);

  &:focus {
    outline: none;
    border: 1px solid var(--dark-blue);
  }

  &::placeholder {
    color: var(--gray-400);
    font-size: 14px;
  }
`

const EyeIcon = css`
  position: absolute;
  right: 10px;
  color: var(--gray-300);
`

const Eye = styled(TbEye)`
  ${EyeIcon}
`

const EyeOff = styled(TbEyeOff)`
  ${EyeIcon}
`

function Input({
  label,
  type,
  name,
  ...rest
}: Props & React.InputHTMLAttributes<HTMLInputElement>): ReactElement {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Container>
      <Label>{label}</Label>
      <InputRow>
        <StyledInput
          {...rest}
          autoComplete="off"
          type={type === "password" && showPassword ? "text" : type}
        />
        {type === "password" &&
          (showPassword ? (
            <EyeOff size={20} onClick={() => setShowPassword(false)} />
          ) : (
            <Eye size={20} onClick={() => setShowPassword(true)} />
          ))}
      </InputRow>
    </Container>
  )
}

export default Input
