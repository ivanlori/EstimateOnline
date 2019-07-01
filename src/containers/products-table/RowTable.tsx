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
  amountPlaceholder: string,
  quantityPlaceholder: string,
  pricePlaceholder: string,
  notesPlaceholder: string,
  typology: Array<Object>,
  priceValue: string,
  quantityValue: string,
  amountValue: string
}

class RowTable extends Component<Props, State> {

  constructor(props: any) {
    super(props)

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
      ],
      priceValue: '',
      quantityValue: '',
      amountValue: ''
    }
    this.priceHandler = this.priceHandler.bind(this)
    this.quantityHandler = this.quantityHandler.bind(this)
  }

  priceHandler(e: ChangeEvent<HTMLInputElement>): void {

    let value = e.currentTarget.value

    this.setState({
      priceValue: value
    })
  }

  quantityHandler(e: ChangeEvent<HTMLInputElement>): void {

    let tot = 0

    this.setState({quantityValue: e.currentTarget.value}, () => {
      return {
        quantityValue: this.state.quantityValue,
      }
    })

    tot = (parseFloat(this.state.priceValue) * parseFloat(this.state.quantityValue))
    console.log(tot)

    this.setState({
      amountValue: tot.toString()
    })
  }

  render() {

    const {
      amountPlaceholder,
      quantityPlaceholder,
      pricePlaceholder,
      notesPlaceholder,
      typology,
      quantityValue,
      priceValue,
      amountValue
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
              defaultValue={priceValue}
              onChange={this.priceHandler}
            />
          </td>
          <td className="small">
            <InputView
              type="text"
              placeholder={quantityPlaceholder}
              defaultValue={quantityValue}
              onChange={this.quantityHandler}
            />
          </td>
          <td className="small">
            <InputView
              type="text"
              placeholder={amountPlaceholder}
              defaultValue={amountValue}
            />
          </td>
        </tr>
      </Fragment>
    )
  }
}

export default RowTable