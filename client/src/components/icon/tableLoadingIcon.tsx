import React, { ReactElement } from "react"

import styled from "styled-components"

const Container = styled.div`
  display: inline-block;
  width: 70px;
  height: 70px;
  opacity: 0.5;

  &:after {
    content: " ";
    display: block;
    width: 70px;
    height: 70px;
    opacity: 0.5;
    border-radius: 50%;
    border: 5px solid var(--dark-blue);
    border-color: var(--dark-blue) transparent var(--dark-blue) transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

function TableLoadingIcon(): ReactElement {
  return <Container />
}

export default TableLoadingIcon
