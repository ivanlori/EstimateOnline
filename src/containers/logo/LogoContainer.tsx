import React, { CSSProperties, Component } from 'react'

import InputView from '../../components/input/Input.view'
import {
  Wrapper,
  Tip,
  Image
} from './LogoContainer.style';
import { ErrorLabel } from '../../components/Error.view'

interface State {
  isErrorVisible: boolean,
  file: string,
  isImageDisplayed: boolean
}

export default class LogoContainer extends Component<{}, State> {

  state = {
    isErrorVisible: false,
    file: '',
    isImageDisplayed: false
  }

  logoUploadHandler = (e: any): void => {

    const value = e.target.value

    if (value !== '') {
      this.setState({
        file: URL.createObjectURL(e.target.files[0]),
        isErrorVisible: false,
        isImageDisplayed: true
      })
    } else {
      this.setState({
        isErrorVisible: true,
        isImageDisplayed: false
      })
    }
  }

  render () {

    const {
      isErrorVisible,
      file,
      isImageDisplayed
    } = this.state

    let contentToDisplay;
    let error;

    if (isImageDisplayed) {
      contentToDisplay = (
        <Image src={ file } />
      )
    } else {
      contentToDisplay = (
        <div>
          <InputView type="file" style={ style } onChange={ this.logoUploadHandler } />
          <Tip>(The ideally format is 200 x 80 px)</Tip>
        </div>
      )
    }

    if (isErrorVisible) {
      error = <ErrorLabel />
    }

    return (
      <Wrapper>
        { contentToDisplay }
        { error }
      </Wrapper>
    )
  }
}

const style: CSSProperties = {
  position: 'absolute',
  top: '40px',
  left: '50px'
}