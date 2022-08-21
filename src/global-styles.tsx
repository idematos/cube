import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fff;

    --gray-100: #f7f7f7;
    --gray-200: #e9ecef;   
    --gray-300: #BDBDBD;
    --gray-400: #b8b8b8;
    --gray-500: #757575;
    --gray-700: #424242;

    --blue-700: #021D3B;

    --font-primary: 'Raleway', sans-serif;
  }

  body, #root {
    margin: 0;
    padding: 0;
    height: 100vh;

    background-color: var(--white);
    font-family: var(--font-primary);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`

export default GlobalStyle
