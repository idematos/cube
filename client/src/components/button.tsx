import React, { ReactElement } from "react"

import styled from "styled-components"

import LoadingIcon from "./loadingIcon"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean
  loading?: boolean
}

const StyledButton = styled.button<Props>`
  color: ${({ secondary }) =>
    secondary ? "var(--dark-blue)" : "var(--white)"};
  background-color: ${({ secondary }) =>
    secondary ? "var(--white)" : "var(--dark-blue)"};
  border: ${({ secondary }) =>
    secondary ? "1px solid var(--gray-300)" : "1px solid var(--dark-blue)"};
  font-weight: 600;
  min-width: 150px;
  min-height: 40px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10%;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function Button({
  secondary,
  loading,
  children,
  ...rest
}: Props): ReactElement {
  return (
    <StyledButton {...rest} secondary={secondary}>
      {loading && <LoadingIcon />}
      {children}
    </StyledButton>
  )
}

export default Button
