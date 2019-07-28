import styled from 'styled-components'

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

export const Image = styled.img`
  width: 200px;
  height: 80px;
  position: absolute;
  left: 105px;
  top: 40px;
`

export const Tip = styled.span`
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  text-align: center;
`