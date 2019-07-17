import React, { Component } from 'react'
import { connect } from 'react-redux'

import { InputView } from '../input/Input.view'
import { Label } from '../../styles/global.style'
import { Wrapper, Percentage } from './VAT.style'
import { changeVat } from '../../store/actions'

const mapDispatchToProps = (dispatch: any) => {
  return {
    setVATtoProps: (value: any) => {
      dispatch(changeVat(value))
    }
  }
}

interface Props {
  setVATtoProps: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class VatContainer extends Component<Props> {

  vatHandler = (e: any) => {
    if (e.target.value !== '') {
      this.props.setVATtoProps(e.target.value)
    }
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

export default connect(null, mapDispatchToProps)(VatContainer)