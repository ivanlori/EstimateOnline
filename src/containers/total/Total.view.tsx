import React, { FC } from 'react'
import { connect } from 'react-redux'

import VatView from '../../components/vat/VAT.view'
import {
  Wrapper,
  Description,
  Title,
  Value
} from './Total.style'

interface State {
  totalAmount: number
}

const TotalView: FC<State> = state => {
  return (
    <Wrapper>
      <Description>
        <Title>{ 'Total/Payments Terms' }</Title>
        <VatView />
      </Description>
      <Value>{ state.totalAmount + '€' }</Value>
    </Wrapper>
  )
}

const mapStateToProps = (state: State) => {
	return {
    totalAmount: state.totalAmount
  }
}

export default connect(mapStateToProps, null)(TotalView)