import React, { ReactElement } from "react"

import styled from "styled-components"

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
}

const StyledSelect = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  font-weight: 600;
  min-width: 200px;
  min-height: 30px;
  font-size: 0.9rem;
  text-align: center;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-100);
  }
`

function Select({ options: values, ...rest }: Props): ReactElement {
  return (
    <StyledSelect {...rest}>
      {values?.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
