import React from 'react'

import { Btn } from './Button.style'

interface Props {
  onClick(): void,
  color: string,
  label: string,
  icon: string
}

const Button = (props: Props) => {
  return (
    <Btn type="button" onClick={ props.onClick } color={ props.color }>
      { props.label }
    </Btn>
  )
}

export default Button