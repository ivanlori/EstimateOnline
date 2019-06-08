import styled, { createGlobalStyle } from 'styled-components'

import { colors } from './color.style'

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    color: #333;
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