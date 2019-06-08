import React, { Component } from 'react'

import { Button } from '../../components/buttons/Button.view'
import { Wrapper, Bar, ButtonWrapper, Version } from './UserBar.style'

export default class UserBarContainer extends Component {

  addHandler = () => {
    console.log('add')
  }

  printHandler = () => {
    window.print()
  }

  previewHandler = () => {
    console.log('preview')
  }

  render () {
    return (
      <Bar>
        <Wrapper>
          <ButtonWrapper>
            <Button onClick={ this.addHandler } label="Add" icon="icon-plus" color="#0b97c4" />
            <Button onClick={ this.printHandler } label="Print" icon="icon-printer" color="#f3bf5f" />
            <Button onClick={ this.previewHandler } label="Preview" icon="icon-printer" color="#6ed37b" />
          </ButtonWrapper>
          <Version>Version: 1.0</Version>
        </Wrapper>
      </Bar>
    )
  }
}