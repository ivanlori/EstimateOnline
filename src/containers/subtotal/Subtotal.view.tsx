import React, { FunctionComponent } from 'react'
import { connect } from 'react-redux'

import {
  Wrapper,
  Description,
  Title,
  Value
} from './Subtotal.style'

interface State {
  amountWithoutTaxes: number
}

const Subtotal: FunctionComponent<State> = ({ amountWithoutTaxes }) => {
  return (
    <Wrapper>
      <Description>
        <Title>Subtotal</Title>
      </Description>
      <Value>{ amountWithoutTaxes + '€' }</Value>
    </Wrapper>
  )
}

const mapStateToProps = (state: State) => {
	return {
    amountWithoutTaxes: state.amountWithoutTaxes
  }
}

export default connect(mapStateToProps, null)(Subtotal)

