import React from 'react'
import styled from 'styled-components'

export const GithubButton = () => {
  return (
    <Wrapper>
      <Label>Do you like this project?<br />Support on Github!</Label>
      <a
        data-size="large"
        href="https://github.com/ivanlori/free-online-estimate"
        aria-label="Star ivanlori/free-online-estimate on GitHub">Star</a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-block;
`

const Label = styled.span`
  margin-right: 10px;
  display: inline-block;
  @include rem(font-size, 13px);
  @include rem(line-height, 20px);
`