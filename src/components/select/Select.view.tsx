import React from 'react'

import { Select } from './Select.style'

export const SelectView = (props: any) => {

  const items = props.data.map((item: any, key: number) =>
    <option key={ item.key }>{ item.value }</option>
  )

  return (
    <Select onChange={ props.onChange }>
      { items }
    </Select>
  )
}