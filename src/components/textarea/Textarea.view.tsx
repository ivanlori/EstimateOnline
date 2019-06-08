import React, { CSSProperties } from 'react'

import { Textarea } from './Textarea.style'
import { Label } from '../../styles/global.style'

interface Props {
  placeholder: string,
  style: CSSProperties
}

export const TextareaView = (props: any) => {
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