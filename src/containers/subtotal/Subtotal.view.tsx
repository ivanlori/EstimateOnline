import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'

import {
  Wrapper,
  Description,
  Title,
  Value
} from './Subtotal.style'

const Subtotal: FunctionComponent = (state: any) => {
  return (
    <Wrapper>
      <Description>
        <Title>Subtotal</Title>
      </Description>
      <Value>{ state.amountWithoutTaxes + '€' }</Value>
    </Wrapper>
  )
}

const mapStateToProps = (state: any) => {
	return {
    amountWithoutTaxes: state.amountWithoutTaxes
  }
}

export default connect(mapStateToProps, null)(Subtotal)

