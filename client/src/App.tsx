import { ReactElement } from "react"

import { Navigate, Route, Routes } from "react-router-dom"
import styled from "styled-components"

import GlobalStyle from "./global-styles"
import Login from "./views/login"
import Transactions from "./views/transactions"

const Container = styled.div`
  width: 100%;
  height: 100%;
`

function App(): ReactElement {
  return (
    <Container>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Container>
  )
}

export default App
