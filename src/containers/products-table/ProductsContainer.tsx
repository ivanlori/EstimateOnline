import React, { Fragment, Component } from 'react'

import RowTable from './RowTable'
import { Button } from '../../components/buttons/Button.view'
import { Table, Thead, Td, Wrapper } from './Products.style'

interface State {
  rows: Array<number>,
  clicks: number
}

class ProductsTable extends Component {

  state = {
    rows: [ 0 ],
    clicks: 0
  }

  createRows = (): JSX.Element[] => {
    return this.state.rows.map((index, el) => {
      return <RowTable key={el} id={ index } />
    })
  }

  addRowHandler = (): void => {
    this.setState({
      clicks: this.state.clicks + 1,
      rows: this.state.rows.concat(this.state.clicks)
    })
  }

  render () {
    return (
      <Fragment>
        <Wrapper>
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
              { this.createRows() }
            </tbody>
          </Table>
          <Button onClick={ this.addRowHandler } label="Add" icon="icon-plus" color="#0b97c4" />
        </Wrapper>
      </Fragment>
    )
  }
}

export default ProductsTable