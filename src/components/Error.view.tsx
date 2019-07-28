import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

export const ErrorLabel: FunctionComponent = () => {
  return (
    <Label>
      Logo Required!
    </Label>
  )
}

const Label = styled.span`
  color: red;
  font-weight: 600;
  position: relative;
  top: 35px;
  left: 153px;
`