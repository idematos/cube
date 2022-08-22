import React, { ReactElement } from "react"

import styled, { css } from "styled-components"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  min-height: 40px;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--gray-300);
      background-color: var(--gray-200);
      border-color: var(--gray-200);
      cursor: not-allowed;
    `}

  &:hover {
    background-color: ${({ secondary, disabled }) =>
      secondary || disabled ? "var(--gray-200)" : "var(--blue)"};
  }
`

function Button({ secondary, children, ...rest }: Props): ReactElement {
  return (
    <StyledButton {...rest} secondary={secondary}>
      {children}
    </StyledButton>
  )
}

export default Button
