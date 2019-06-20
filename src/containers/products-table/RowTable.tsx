import React, { Component, CSSProperties, Fragment } from 'react'

import { SelectView } from '../../components/select/Select.view'
import { InputView } from '../../components/input/Input.view'
import { TextareaView } from '../../components/textarea/Textarea.view'

const textareaStyle: CSSProperties = {
  width: '265px',
  height: '25px',
  display: 'inline-block'
}

interface Props {
  id: number
}

interface State {
  amountPlaceholder: string,
  quantityPlaceholder: string,
  pricePlaceholder: string,
  notesPlaceholder: string,
  typology: Array<Object>
}

class RowTable extends Component<Props, State> {

  constructor (props: any) {
    super (props)

    this.state = {
      amountPlaceholder: '0.00',
      quantityPlaceholder: '0',
      pricePlaceholder: '0.00',
      notesPlaceholder: 'Product details',
      typology: [
        { key: 0, value: '-- Select --' },
        { key: 1, value: 'Service' },
        { key: 2, value: 'Hours' },
        { key: 3, value: 'Days', },
        { key: 4, value: 'Product' }
      ]
    }
  }

  render() {

    const {
      amountPlaceholder,
      quantityPlaceholder,
      pricePlaceholder,
      notesPlaceholder,
      typology
    } = this.state

    return (
      <Fragment>
        <tr key={this.props.id}>
          <td className="small">
            <SelectView
              data={typology}
            />
          </td>
          <td className="large">
            <TextareaView placeholder={notesPlaceholder} style={textareaStyle} />
          </td>
          <td className="small">
            <InputView
              type="text"
              placeholder={pricePlaceholder}
              />
          </td>
          <td className="small">
            <InputView type="text" placeholder={quantityPlaceholder} />
          </td>
          <td className="small">
            <InputView type="text" placeholder={amountPlaceholder} />
          </td>
        </tr>
      </Fragment>
    )
  }
}

export default RowTable