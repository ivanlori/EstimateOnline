import React, { CSSProperties } from 'react';

import {
  Wrapper,
  Canvas,
  Label,
  ErrorLabel,
  Tip
} from './LogoUpload.style';
import { InputView } from '../../components/input/Input.view';

const style: CSSProperties = {
  visibility: 'hidden'
}

export const LogoUpload = () => {
  return (
    <Wrapper>
      <Canvas id="js-image-blank" />
      <InputView type="file" style={ style } />
      <Label htmlFor="js-logo-image">Choose a logo</Label>
      <Tip>(The ideally format is 200 x 80 px)</Tip>
      <ErrorLabel>Logo required!</ErrorLabel>
    </Wrapper>
  )
}
