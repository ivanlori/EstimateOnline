import React, { FunctionComponent, CSSProperties, ChangeEvent } from 'react'

interface Props {
  placeholder?: string,
  type: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  style?: CSSProperties,
  defaultValue?: string
}

export const InputView: FunctionComponent<Props> = ({ placeholder, type, onChange, style, defaultValue }) => {
  return (
    <input
      type={ type }
      placeholder={ placeholder }
      onChange={ onChange }
      style={ style }
      className="input"
      defaultValue={ defaultValue }
    />
  )
}