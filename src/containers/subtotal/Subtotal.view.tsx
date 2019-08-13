import React, { FC } from 'react'
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

const Subtotal: FC<State> = props => {
  return (
    <Wrapper>
      <Description>
        <Title>Subtotal</Title>
      </Description>
      <Value>{ props.amountWithoutTaxes + '€' }</Value>
    </Wrapper>
  )
}

const mapStateToProps = (state: State) => {
	return {
    amountWithoutTaxes: state.amountWithoutTaxes
  }
}

export default connect(mapStateToProps, null)(Subtotal)

