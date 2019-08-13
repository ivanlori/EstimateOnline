import React, { Component, CSSProperties, Fragment, ChangeEvent } from 'react'
import { connect } from 'react-redux'

import SelectView from '../../components/select/Select.view'
import InputView from '../../components/input/Input.view'
import TextareaView from '../../components/textarea/Textarea.view'
import { amountWithoutTaxes } from '../../store/actions'

const textareaStyle: CSSProperties = {
  width: '265px',
  height: '25px',
  display: 'inline-block'
}

interface Props {
  id: number,
  setAmountWithoutTaxes: (amount: string) => void
}

interface State {
  quantityPlaceholder: string,
  pricePlaceholder: string,
  notesPlaceholder: string,
  amount: string,
  [key: string]: any
}

class RowTable extends Component<Props, State> {

  state = {
    quantityPlaceholder: '0',
    pricePlaceholder: '0.00',
    notesPlaceholder: 'Product details',
    amount: '',
    price: '',
    quantity: ''
  }

  dataChange = (e: ChangeEvent<HTMLInputElement>): void => {
    
    const {name, value} = e.target

    this.setState({
      [name]: value
    }, () => this.calculateSingleAmount())

  }

  calculateSingleAmount = (): void => {

    let totSingleAmount = parseFloat(this.state.price) * parseFloat(this.state.quantity)

    if (!isNaN(totSingleAmount)) {
      this.setState({
        amount: totSingleAmount.toString()
      }, () => this.calculateTotalAmount())

    }
  }

  sum = (a: number, b: number): number => {
    return a + b
  }

  calculateTotalAmount = (): void => {
    let amountEl: NodeList = document.querySelectorAll('.amount')
    let total: Array<number> = []

    Array.prototype.forEach.call(amountEl, (el, i) => {
      total.push(parseFloat(el.value))
    });

    this.props.setAmountWithoutTaxes(total.reduce(this.sum).toString())
  }

  render() {

    const {
      quantityPlaceholder,
      pricePlaceholder,
      notesPlaceholder,
      amount
    } = this.state

    return (
      <Fragment>
        <tr key={this.props.id}>
          <td className="small">
            <SelectView />
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
              className="amount"
              value={amount}
              name="amount"
              id={ `id-${this.props.id}` }
            />
          </td>
        </tr>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setAmountWithoutTaxes: (value: any) => {
      dispatch(amountWithoutTaxes(value))
    }
  }
}

export default connect(null, mapDispatchToProps)(RowTable)