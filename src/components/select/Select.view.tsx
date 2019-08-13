import React, { FC, useState } from 'react'

import { Select } from './Select.style'

const SelectView: FC = () => {

  const [state] = useState({
    typology: [
      { key: 0, value: '-- Select --' },
      { key: 1, value: 'Service' },
      { key: 2, value: 'Hours' },
      { key: 3, value: 'Days', },
      { key: 4, value: 'Product' }
    ]
  })

  const items = state.typology.map((item: any, key: number) =>
    <option key={ item.key }>{ item.value }</option>
  )

  return (
    <Select>
      { items }
    </Select>
  )
}

export default SelectView