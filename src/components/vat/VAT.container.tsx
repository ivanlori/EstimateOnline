import React, { Component } from 'react'
import { connect } from 'react-redux'

import InputView from '../input/Input.view'
import { Label } from '../../styles/global.style'
import { Wrapper, Percentage } from './VAT.style'
import { changeVat, totalAmount } from '../../store/actions'

interface Props {
  setVATtoProps: (value: string) => void
  setAmountWithTaxes: (value: any) => void,
  amountWithoutTaxes: string
}

class VatContainer extends Component<Props> {

  vatHandler = (e: any): void => {
    if (e.target.value !== '') {
      let vatValue = e.target.value
      this.amountWithTaxesCalc(vatValue)
      this.props.setVATtoProps(vatValue)
    }
  }

  amountWithTaxesCalc = (vat: number): void => {
    let amountWithoutTaxesParsed = parseFloat(this.props.amountWithoutTaxes)
    let vatCalculated = this.calculateVat(amountWithoutTaxesParsed, vat)
    let total = amountWithoutTaxesParsed + vatCalculated
    this.props.setAmountWithTaxes(total.toFixed(2))
  }

  calculateVat (amount: number, percentage: number): number {
    return (amount * percentage) / 100
  } 

  render() {
    return (
      <Wrapper>
        <Label>VAT</Label>
        <InputView
          type="text"
          placeholder="0"
          onChange={ this.vatHandler }
        />
        <Percentage>%</Percentage>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setVATtoProps: (value: any) => {
      dispatch(changeVat(value))
    },
    setAmountWithTaxes: (value: any) => {
      dispatch(totalAmount(value))
    }
  }
}

const mapStateToProps = (state: any) => {
	return {
    amountWithoutTaxes: state.amountWithoutTaxes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VatContainer)