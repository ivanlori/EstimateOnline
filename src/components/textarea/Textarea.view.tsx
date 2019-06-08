import React, { CSSProperties } from 'react'

import { Textarea } from './Textarea.style'
import { Label } from '../../styles/global.style'

interface Props {
  placeholder: string,
  label?: string,
  style: CSSProperties
}

export const TextareaView = (props: Props) => {
  return (
    <React.Fragment>
      <Label>{ props.label }</Label>
      <Textarea
        placeholder={ props.placeholder }
        style={ props.style }
      />
    </React.Fragment>
  )
}