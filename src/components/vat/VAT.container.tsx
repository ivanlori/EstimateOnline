import React, { Component } from 'react'
import { connect } from 'react-redux'

import { InputView } from '../input/Input.view'
import { Label } from '../../styles/global.style'
import { Wrapper, Percentage } from './VAT.style'
import { changeVat } from '../../store/actions'

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeVat: (value: any) => {
      dispatch(changeVat(value))
    }
  }
}

interface Props {
  changeVat: (event: React.ChangeEvent<HTMLInputElement>) => void
}

class VatContainer extends Component<Props> {

  vatHandler = (e: any) => {
    if (e.target.value !== '') {
      this.props.changeVat(e.target.value)
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