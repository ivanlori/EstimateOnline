import styled from 'styled-components'

import { colors } from '../../styles/color.style'

export const Wrapper = styled.div`
  margin-bottom: 10px;
`

export const Description = styled.div`
  height: 26px;
  width: 120px;
  display: inline-block;
  border: 1px solid #ced4da;
  padding: 10px;
  border-right: 0;
`

export const Title = styled.div`
  margin: 0;
  font-weight: bold;
`

export const Value = styled.div`
  float: right;
  border: 1px solid #ced4da;
  text-align: right;
  padding: 10px;
  width: 150px;
  font-size: 23px;
  background: ${ colors.basic.white };
`