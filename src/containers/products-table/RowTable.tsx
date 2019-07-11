import React, { Component, CSSProperties, Fragment, ChangeEvent } from 'react'

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
  quantityPlaceholder: string,
  pricePlaceholder: string,
  notesPlaceholder: string,
  typology: Array<Object>,
  amount: string,
  [key: string]: any
}

class RowTable extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      quantityPlaceholder: '0',
      pricePlaceholder: '0.00',
      notesPlaceholder: 'Product details',
      typology: [
        { key: 0, value: '-- Select --' },
        { key: 1, value: 'Service' },
        { key: 2, value: 'Hours' },
        { key: 3, value: 'Days', },
        { key: 4, value: 'Product' }
      ],
      amount: '',
      price: '',
      quantity: ''
    }

    this.dataChange = this.dataChange.bind(this)
  }

  dataChange (e: ChangeEvent<HTMLInputElement>): void {
    
    const {name, value} = e.target

    this.setState({
      [name]: value
    }, () => this.calculateSingleAmount())

  }

  calculateSingleAmount = (): void => {

    let totSingleAmount = parseFloat(this.state.price) * parseFloat(this.state.quantity)

    this.setState({
      amount: totSingleAmount.toString()
    })

    this.calculateTotalAmount()
  }

  calculateTotalAmount = (): void => {


  }

  render() {

    const {
      quantityPlaceholder,
      pricePlaceholder,
      notesPlaceholder,
      typology,
      amount
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
            <TextareaView
              placeholder={notesPlaceholder}
              style={textareaStyle}
            />
          </td>
          <td className="small">
            <InputView
              type="text"
              placeholder={pricePlaceholder}
              onChange={this.dataChange}
              name="price"
            />
          </td>
          <td className="small">
            <InputView
              type="text"
              placeholder={quantityPlaceholder}
              onChange={this.dataChange}
              name="quantity"
            />
          </td>
          <td className="small">
            <InputView
              type="text"
              readOnly
              value={amount}
              name="amount"
            />
          </td>
        </tr>
      </Fragment>
    )
  }
}

export default RowTable