import React, { ReactElement } from "react"

import styled from "styled-components"

const Container = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-bottom: 5px;

  &:after {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid var(--white);
    border-color: var(--white) transparent var(--white) transparent;
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

function LoadingIcon(): ReactElement {
  return <Container />
}

export default LoadingIcon
