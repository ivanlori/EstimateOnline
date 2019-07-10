import React, { FunctionComponent, CSSProperties, ChangeEvent } from 'react'

interface Props {
  placeholder?: string,
  type: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  style?: CSSProperties,
  defaultValue?: string,
  value?: string,
  name?: string,
  readOnly?: boolean
}

export const InputView: FunctionComponent<Props> = ({ placeholder, type, onChange, style, defaultValue, value, name, readOnly }) => {
  return (
    <input
      type={ type }
      placeholder={ placeholder }
      onChange={ onChange }
      style={ style }
      className="input"
      defaultValue={ defaultValue }
      value={ value }
      name={ name }
      readOnly={ readOnly }
    />
  )
}