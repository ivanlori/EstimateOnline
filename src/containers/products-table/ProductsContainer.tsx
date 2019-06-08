import React, { Component } from 'react'

import { SelectView } from '../../components/select/Select.view'
import { InputView } from '../../components/input/Input.view'
import { TextareaView } from '../../components/textarea/Textarea.view'
import { Table, Thead, Td } from './Products.style'

interface Props {

}

interface State {
  amountPlaceholder: string,
  quantityPlaceholder: string,
  pricePlaceholder: string,
  typology: Array<Object>
}

export default class ProductsTable extends Component<Props, State> {

  constructor (props: Props) {
    super (props)

    this.state = {
      amountPlaceholder: '0.00',
      quantityPlaceholder: '0',
      pricePlaceholder: '0.00',
      typology: [
        { key: 0, value: '-- Select --' },
        { key: 1, value: 'Service' },
        { key: 2, value: 'Hours' },
        { key: 3, value: 'Days', },
        { key: 4, value: 'Product' }
      ]
    }
  }

  typologyHandler () {

  }

  render() {

    const {
      amountPlaceholder,
      quantityPlaceholder,
      pricePlaceholder,
      typology
    } = this.state

    return (
      <React.Fragment>
        <Table>
          <Thead>
            <tr>
              <Td>Item</Td>
              <Td>Description</Td>
              <Td>Unity price</Td>
              <Td>Quantity</Td>
              <Td>Amount</Td>
            </tr>
          </Thead>
          <tbody>
            <tr>
              <td>
                <SelectView
                  onChange={ this.typologyHandler }
                  data={ typology }
                />
              </td>
              <td>
                <TextareaView width="245" />
              </td>
              <td>
                <InputView type="text" placeholder={ pricePlaceholder } />
              </td>
              <td>
                <InputView type="text" placeholder={ quantityPlaceholder } />
              </td>
              <td>
                <span></span>
                <InputView type="text" placeholder={ amountPlaceholder } />
              </td>
            </tr>
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}