import styled from 'styled-components'

import { Input } from '../input/Input.style'

export const Textarea = styled.textarea`
  ${ Input }
  ${ props => props.style ? `${ props.style }` : '' };
`