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

  body {
    margin: 0;
    padding: 0;
    background: var(--white);
    font-family: var(--font-primary);
  }
`

export default GlobalStyle
