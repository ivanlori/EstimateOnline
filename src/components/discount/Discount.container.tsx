import React, { Component } from 'react'
import { connect } from 'react-redux';

import { InputView } from '../input/Input.view'
import { Wrapper, Percentage } from './Discount.style'
import { Label } from '../../styles/global.style'

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDiscount: (value: any) => {
      dispatch({
        type: 'CHANGE_DISCOUNT',
        payload: value
      })
    }
  }
}

interface Props {
  changeDiscount: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

class DiscountContainer extends Component<Props> {

  discountHandler = (e: any) => {
    this.props.changeDiscount(e.target.value)
  }

  render() {
    return (
      <Wrapper>
        <Label>Discount</Label>
        <InputView
          type="text"
          placeholder="0"
          onChange={ this.discountHandler }
        />
        <Percentage>%</Percentage>
      </Wrapper>
    )
  }
}

export default connect(null, mapDispatchToProps)(DiscountContainer)