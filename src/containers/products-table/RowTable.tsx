import React, { Component, CSSProperties, Fragment, ChangeEvent } from 'react'
import { connect } from 'react-redux'

import { SelectView } from '../../components/select/Select.view'
import { InputView } from '../../components/input/Input.view'
import { TextareaView } from '../../components/textarea/Textarea.view'
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

    if (!isNaN(totSingleAmount)) {
      this.setState({
        amount: totSingleAmount.toString()
      }, () => this.calculateTotalAmount())

    }
  }

  calculateTotalAmount = (): void => {
    let resultArray = []
    let amount = (document.getElementById(`id-${this.props.id}`) as HTMLInputElement)

    resultArray.push(amount)
    for (let i in amount) {
      
 }
    this.props.setAmountWithoutTaxes(this.state.amount)
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