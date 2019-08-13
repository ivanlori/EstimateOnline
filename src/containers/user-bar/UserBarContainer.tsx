import React, { FC } from 'react'

import Button from '../../components/buttons/Button.view'
import {
  Wrapper,
  Bar,
  ButtonWrapper,
  Version
} from './UserBar.style'

const UserBarContainer: FC = () => {

  const printHandler = () => window.print()

  const previewHandler = () => console.log('preview')

  return (
    <Bar>
      <Wrapper>
        <ButtonWrapper>
          <Button onClick={printHandler} label="Print" icon="icon-printer" color="#f3bf5f" />
          <Button onClick={previewHandler} label="Preview" icon="icon-printer" color="#6ed37b" />
        </ButtonWrapper>
        <Version>Version: 1.0</Version>
      </Wrapper>
    </Bar>
  )
}

export default UserBarContainer