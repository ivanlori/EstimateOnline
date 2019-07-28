import React, { Component } from 'react'

import { Label } from '../../styles/global.style'
import { InputView } from '../input/Input.view'
import { Wrapper } from './Datepicker.style'

export default class DatepickerContainer extends Component {

  state = {
    startDate: new Date()
  }

  changeHandler = (date: Date): void => {
    this.setState({
      startDate: date
    });
  }

  render () {
    return (
      <Wrapper>
        <Label>Date</Label>
        <InputView
          type="date"
        />
      </Wrapper>
    )
  }
}