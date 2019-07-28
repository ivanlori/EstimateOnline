import React, { CSSProperties, Fragment } from 'react'

import { Textarea } from './Textarea.style'
import { Label } from '../../styles/global.style'

interface Props {
  placeholder: string,
  label?: string,
  style: CSSProperties
}

const TextareaView = (props: Props) => {
  return (
    <Fragment>
      <Label>{ props.label }</Label>
      <Textarea
        placeholder={ props.placeholder }
        style={ props.style }
        className="input"
      />
    </Fragment>
  )
}

export default TextareaView