import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root {
    --white: #fff;

    --shadow: rgba(0, 0, 0, 0.4);

    --gray-100: #f7f7f7;
    --gray-200: #e9ecef;   
    --gray-300: #BDBDBD;
    --gray-400: #b8b8b8;
    --gray-500: #757575;
    --gray-600: #424242;

    --dark-blue: #021D3B;

    --light-purple: #ebecfd;

    --font-primary: 'Raleway', sans-serif;
  }

  body, #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    
    background-color: var(--white);
    font-family: var(--font-primary);
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    color: var(--dark-blue);
  }

  span {
    color: var(--gray-500);
  }
`

export default GlobalStyle
