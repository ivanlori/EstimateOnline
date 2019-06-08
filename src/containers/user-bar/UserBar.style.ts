import styled from 'styled-components'

import { colors } from '../../styles/color.style'

export const Bar = styled.div`
  padding: 10px 0;
  text-align: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 65px;
  background: ${ colors.basic.lightGrey };
  border-top: 1px solid ${ colors.basic.grey };
  z-index: 2;
`

export const ButtonWrapper = styled.div`
  button {
    margin: 0 8px;
    position: relative;
    top: 7px;
  }
`

export const Wrapper = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 37% 35% 30%;
  grid-template-rows: 65px;
  margin: 0 auto;
`

export const Version = styled.div`
  float: right;
  margin-top: 20px;
`