import styled from 'styled-components'

import { colors } from '../../styles/color.style'

export const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
`

export const Thead = styled.thead`
  background: ${ colors.basic.blue };
  color: white;
  font-weight: 600;
`

export const Td = styled.td`
  padding: 10px 0px 10px 10px;
`

export const Wrapper = styled.div`
  min-height: 380px;
  position: relative;
  margin-top: 30px;
  border-bottom: 1px solid #ced4da;
`