import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from '../../components/buttons/Button.view'
import { Wrapper, Bar, ButtonWrapper, Version } from './UserBar.style'
import { addRow } from '../../store/actions'

const mapDispatchToProps = (dispatch: any) => {
  return {
    addRow: (value: number) => {
      dispatch(addRow(value))
    }
  }
}

interface State {
  clicks: number
}

interface Props {
  addRow: (event: any) => void
}

class UserBarContainer extends Component<Props, State> {

  constructor (props: any) {
    super (props)
    this.state = {
      clicks: 0
    }
  }

  addHandler = () => {
    this.setState({
      clicks: this.state.clicks + 1
    })
    this.props.addRow(this.state.clicks)
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

export default connect(null, mapDispatchToProps)(UserBarContainer)