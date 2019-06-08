import React from 'react'

import { Btn } from './Button.style'

export const Button = (props: any) => {
  return (
    <Btn type="button" onClick={ props.onClick } color={ props.color }>
      { props.label }
    </Btn>
  )
}