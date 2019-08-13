import React, { CSSProperties, Fragment, FC } from 'react'

import { Textarea } from './Textarea.style'
import { Label } from '../../styles/global.style'

interface Props {
  placeholder: string,
  label?: string,
  style: CSSProperties
}

const TextareaView: FC<Props> = props => {
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