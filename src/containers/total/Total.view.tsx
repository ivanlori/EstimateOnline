import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'

import VatView from '../../components/vat/VAT.view'
import {
  Wrapper,
  Description,
  Title,
  Value
} from './Total.style'

const TotalView: FunctionComponent = (state: any) => {
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

const mapStateToProps = (state: any) => {
	return {
    totalAmount: state.totalAmount
  }
}

export default connect(mapStateToProps, null)(TotalView)