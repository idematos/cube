import React, { ReactElement, useEffect, useState } from "react"

import styled from "styled-components"

import Empty from "./empty"

export interface Props {
  rows: any[]
  columns?: {
    name: string
    label: string
  }[]
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  height: 100%;
`

function Table({ rows, columns }: Props): ReactElement {
  const [arr, setArr] = useState<any[]>(rows)

  useEffect(() => {
    setArr(rows)
  }, [])

  return (
    <Container>
      <Empty />
    </Container>
  )
}

export default Table
