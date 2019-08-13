import React, { FC } from 'react'

import InputView from '../input/Input.view'
import { Label } from '../../styles/global.style'
import { Wrapper } from './Datepicker.style'

const Datepicker: FC = () => {
  return (
    <Wrapper>
      <Label>Date</Label>
      <InputView type="date" />
    </Wrapper>
  )
}

export default Datepicker
