import React from 'react'

import VatView from '../../components/vat/VAT.view'
import {
  Wrapper,
  Description,
  Title,
  Value
} from './Total.style'

export const Total = () => {
  return (
    <Wrapper>
      <Description>
        <Title>{ 'Total/Payments Terms' }</Title>
        <VatView />
      </Description>
      <Value>0</Value>
    </Wrapper>
  )
}