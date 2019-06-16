import styled, { createGlobalStyle } from 'styled-components'

import { colors } from './color.style'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    color: #333;
  }

  .input {
    display: block;
    padding: 0.375rem 0.75rem;
    line-height: 1.5;
    color: #495057;
    background: ${ colors.basic.white };
    background-clip: border-box;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    font-size: 15px;
    border-radius: 5px;

    &:focus {
      color: #495057;
      background: ${ colors.basic.white };
      border-color: ${ colors.basic.blue };
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25)
    }
  }

  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }

  .small {
    width: 150px;
    vertical-align: top;
  }

  .large {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    resize: vertical;
    min-height: 45px;
    max-height: 60px;
    height: 45px;
    padding: 6px;
    border: 1px solid #ced4da;
  }
`

export const Wrapper = styled.div`
  background-color: ${ colors.basic.lightGrey };
  max-width: 1050px;
  min-width: 940px;
  border: 1px solid ${ colors.basic.grey };
  margin: 20px auto;
  margin-bottom: 110px;
  padding: 20px;
  padding-top: 0;
  min-height: 800px;
  box-shadow: 0 0 3px #ced4da;
`

export const Title = styled.div`
  mmargin-bottom: 25px;
  
  h2 {
    border-bottom: 1px solid ${ colors.basic.grey };
  }
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: .5rem;
`

export const Footer = styled.div`
  text-align: right;
  margin-top: 20px;
`