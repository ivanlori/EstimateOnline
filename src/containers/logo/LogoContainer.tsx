import React, { CSSProperties, Component } from 'react';
import { connect } from 'react-redux'

import {
  Wrapper,
  Canvas,
  Label,
  ErrorLabel,
  Tip
} from './LogoContainer.style';
import { InputView } from '../../components/input/Input.view';
import { logoUpload } from '../../store/actions'

const style: CSSProperties = {
  visibility: 'hidden'
}

interface Props {
  logoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    logoUpload: (value: any) => {
      dispatch(logoUpload(value))
    }
  }
}

class LogoUploadContainer extends Component<Props> {

  logoUploadHandler = (e: any) => {
    if (e.target.value !== '') {
      this.props.logoUpload(false)
    }
  }

  render () {
    return (
      <Wrapper>
        <Canvas id="js-image-blank" />
        <InputView
          type="file"
          style={ style }
          onChange={ this.logoUploadHandler } />
        <Label htmlFor="js-logo-image">Choose a logo</Label>
        <Tip>(The ideally format is 200 x 80 px)</Tip>
        <ErrorLabel>Logo required!</ErrorLabel>
      </Wrapper>
    )
  }
}

export default connect(null, mapDispatchToProps)(LogoUploadContainer)
