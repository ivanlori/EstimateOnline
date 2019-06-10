import styled from 'styled-components'

export const Textarea = styled.textarea`
  ${ props => props.style ? `${ props.style }` : '' };
`