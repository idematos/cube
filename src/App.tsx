import "./App.css"
import { ReactElement } from "react"

import { Navigate, Route, Routes } from "react-router-dom"

import GlobalStyle from "./global-styles"
import Login from "./views/login"

function App(): ReactElement {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path='/products' element={<Products />} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
