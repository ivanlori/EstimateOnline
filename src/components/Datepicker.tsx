import React, { Component } from 'react'
import Flatpickr from 'react-flatpickr'
import styled from 'styled-components'
import 'flatpickr/dist/themes/material_green.css'

import { Label } from '../styles/global.style'
import { Input } from './input/Input.style'

interface Props {

}

interface State {
  date: string
}

export default class Datepicker extends Component<Props, State> {
  
  constructor (props: any) {
    super(props)
 
    this.state = {
      date: ''
    }
  }
 
  render () {

    const { date } = this.state;

    return (
      <React.Fragment>
        <Label>Date</Label>
        <PickerStyled
          value={this.state.date}
          onChange={date => { new Date }}
        />
      </React.Fragment>
    )
  }
}

const PickerStyled = styled(Flatpickr)`
  ${ Input }
  position: absolute;
  top: 37px;
  right: 25px;
`