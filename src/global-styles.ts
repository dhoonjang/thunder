import reset from "styled-reset";
import { createGlobalStyle } from "./typed-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Maven+Pro');
  ${reset};
  * {
      box-sizing: border-box;
  }
  body{
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    color: #40514e;
  }
  a{ 
      color:inherit;
      text-decoration:none;
  }
  input,
  button{
      &:focus,
      &:active{outline:none}
  }
  h1,h2,h3,h4,h5,h6{
    font-family:'Maven Pro', sans-serif;
  }
  #element::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;