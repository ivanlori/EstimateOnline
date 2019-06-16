import React, { Component } from 'react'
import Datepicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'

import { Label } from '../styles/global.style'

interface Props { }

interface State {
  startDate: Date
}

export default class DatepickerContainer extends Component<Props, State> {
  
  constructor (props: any) {
    super(props)

    this.state = {
      startDate: new Date()
    }
    this.changeHandler = this.changeHandler.bind(this)
  }

  changeHandler (date: any) {
    this.setState({
      startDate: date
    });
  }
 
  render () {
    return (
      <React.Fragment>
        <Label>Date</Label>
        <DatepickerStyled
          selected={ this.state.startDate }
          onChange={ this.changeHandler }
          dateFormat="dd/MM/yyyy"
          className="input"
        />
      </React.Fragment>
    )
  }
}

const DatepickerStyled = styled(Datepicker)`
  width: 120px;
  margin-right: 15px;
`