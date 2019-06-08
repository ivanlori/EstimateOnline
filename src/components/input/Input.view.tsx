import React, { FunctionComponent, CSSProperties } from 'react'

import { Input } from './Input.style'

interface Props {
  placeholder?: string,
  type: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  style?: CSSProperties
}

export const InputView: FunctionComponent<Props> = ({ placeholder, type, onChange, style }) => {
  return (
    <Input
      type={ type }
      placeholder={ placeholder }
      onChange={ onChange }
      style={ style }
    />
  )
}

InputView.defaultProps = {
  type: 'text'
}