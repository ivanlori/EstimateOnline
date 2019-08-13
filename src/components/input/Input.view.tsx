import React, { FC, CSSProperties, ChangeEvent } from 'react'

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

const InputView: FC<Props> = props => {
  return (
    <input
      type={ props.type }
      placeholder={ props.placeholder }
      onChange={ props.onChange }
      style={ props.style }
      className={ `input ${props.className}` }
      defaultValue={ props.defaultValue }
      value={ props.value }
      name={ props.name }
      readOnly={ props.readOnly }
      id={ props.id }
    />
  )
}

export default InputView