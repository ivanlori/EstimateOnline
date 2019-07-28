import React, { FunctionComponent, CSSProperties, ChangeEvent } from 'react'

interface Props {
  placeholder?: string,
  type: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
  style?: CSSProperties,
  defaultValue?: string,
  value?: string,
  name?: string,
  readOnly?: boolean,
  id?: string,
  className?: string
}

export const InputView: FunctionComponent<Props> = ({ placeholder, type, onChange, style, defaultValue, value, name, readOnly, id, className }) => {
  return (
    <input
      type={ type }
      placeholder={ placeholder }
      onChange={ onChange }
      style={ style }
      className={ `input ${className}` }
      defaultValue={ defaultValue }
      value={ value }
      name={ name }
      readOnly={ readOnly }
      id={ id }
    />
  )
}