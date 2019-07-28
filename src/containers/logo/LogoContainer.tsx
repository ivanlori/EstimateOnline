import React, { CSSProperties, Component } from 'react'
import { connect } from 'react-redux'

import {
  Wrapper,
  Tip,
  Image
} from './LogoContainer.style';
import { ErrorLabel } from '../../components/Error.view'
import { InputView } from '../../components/input/Input.view'
import { logoUpload } from '../../store/actions'

interface Props {
  logoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface State {
  isErrorVisible: boolean,
  file: string,
  isImageDisplayed: boolean
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoUpload: (value: any) => {
      dispatch(logoUpload(value))
    }
  }
}

class LogoUploadContainer extends Component<Props, State> {

  constructor (props: Props) {
    super(props)

    this.state = {
      isErrorVisible: false,
      file: '',
      isImageDisplayed: false
    }
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

    return (
      <Wrapper>
        <Image src={ file } />
        <InputView
          type="file"
          style={ style }
          onChange={ this.logoUploadHandler }
          hidden={ isImageDisplayed }
        />
        <Tip>(The ideally format is 200 x 80 px)</Tip>
        <ErrorLabel isVisible={ isErrorVisible } />
      </Wrapper>
    )
  }
}

const style: CSSProperties = {
  position: 'absolute',
  top: '40px',
  left: '50px'
}

export default connect(null, mapDispatchToProps)(LogoUploadContainer)