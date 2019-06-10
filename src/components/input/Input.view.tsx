import React, { FunctionComponent, CSSProperties } from 'react'

interface Props {
  placeholder?: string,
  type: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  style?: CSSProperties
}

export const InputView: FunctionComponent<Props> = ({ placeholder, type, onChange, style }) => {
  return (
    <input
      type={ type }
      placeholder={ placeholder }
      onChange={ onChange }
      style={ style }
      className="input"
    />
  )
}

InputView.defaultProps = {
  type: 'text'
}