import styled from 'styled-components'

import { Input } from '../../components/input/Input.style'

export const InputStyle = styled.input`
  .logo input {
    display: block;
    position: absolute;
    left: 35px;
    top: 50px;
    z-index: -5;
  }

  .logo .x-logo-visible {
    outline: none;
  }

  .logo input,
  label,
  span {
    display: none;
  }
`;

export const Wrapper = styled.div`
  outline: 2px dashed #92b0b3;
  outline-offset: -10px;
  -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
  transition: outline-offset .15s ease-in-out, background-color .15s linear;
  margin: 25px 90px 60px 45px;
  position: relative;
`

export const ErrorLabel = styled.span`
  color: red;
  font-weight: 600;
  position: relative;
  top: 35px;
  left: 153px;
`

export const Canvas = styled.canvas`
  position: relative;
  top: 35px;
  left: 55px;
`

export const Label = styled.label`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 72px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;

  :hover & {
    text-decoration: underline;
  }
`

export const Tip = styled.span`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
`