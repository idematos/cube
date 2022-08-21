import React, { ReactElement } from "react"

import styled from "styled-components"

interface Props {
  secondary?: boolean
}

const StyledButton = styled.button<Props>`
  color: ${({ secondary }) => (secondary ? "var(--blue-700)" : "var(--white)")};
  background-color: ${({ secondary }) =>
    secondary ? "var(--white)" : "var(--blue-700)"};
  border: ${({ secondary }) =>
    secondary ? "1px solid var(--gray-300)" : "1px solid var(--blue-700)"};
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
