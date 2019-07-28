import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  isVisible: boolean
}

export const ErrorLabel: FunctionComponent<Props> = ({ isVisible }) => {
  return (
    <Label isVisible={ isVisible }>
      Logo Required!
    </Label>
  )
}

const Label = styled.span<Props>`
  color: red;
  font-weight: 600;
  position: relative;
  top: 35px;
  left: 153px;
  ${ props => props.isVisible ? 'display: block;' : 'display: none;' }
`