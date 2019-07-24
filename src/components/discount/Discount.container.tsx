import React, { Component } from 'react'
import { connect } from 'react-redux';

import { InputView } from '../input/Input.view'
import { Wrapper, Percentage } from './Discount.style'
import { Label } from '../../styles/global.style'
import { changeDiscount, amountWithoutTaxes } from '../../store/actions'

interface Props {
  changeDiscount: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setAmountWithoutTaxes: (value: any) => void,
  amountWithoutTaxes: string
}

class DiscountContainer extends Component<Props> {

  discountHandler = (e: any): void => {
    let discountValue = e.target.value
    this.props.changeDiscount(discountValue)
    let discount = this.calculareDiscountPercentage(parseFloat(this.props.amountWithoutTaxes), discountValue)

  }

  calculareDiscountPercentage = (discount: number, amount: number): number => {
    return (discount * amount) / 100
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

const mapStateToProps = (state: any) => {
	return {
    amountWithoutTaxes: state.amountWithoutTaxes
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDiscount: (value: any) => {
      dispatch(changeDiscount(value))
    },
    setAmountWithoutTaxes: (value: any) => {
      dispatch(amountWithoutTaxes(value))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountContainer)