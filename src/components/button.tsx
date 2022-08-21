import React, { ReactElement } from "react"

import styled from "styled-components"

interface Props {
  secondary?: boolean
}

const StyledButton = styled.button<Props>`
  color: ${({ secondary }) =>
    secondary ? "var(--dark-blue)" : "var(--white)"};
  background-color: ${({ secondary }) =>
    secondary ? "var(--white)" : "var(--dark-blue)"};
  border: ${({ secondary }) =>
    secondary ? "1px solid var(--gray-300)" : "1px solid var(--dark-blue)"};
  font-weight: 600;
  min-width: 135px;
  min-height: 45px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  cursor: pointer;
`

function Button({
  secondary,
  children,
  ...rest
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>): ReactElement {
  return (
    <StyledButton {...rest} secondary={secondary}>
      {children}
    </StyledButton>
  )
}

export default Button
