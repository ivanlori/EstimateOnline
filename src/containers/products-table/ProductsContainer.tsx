import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';

import RowTable from './RowTable'
import { Table, Thead, Td, Wrapper } from './Products.style'

const mapStateToProps = (state: any) => {
  return {
    rowKey: state.rowKey
  }
}

interface Props {
  rowKey: number
}

interface State {
  
}

class ProductsTable extends Component<Props, State> {

  createRows = () => {
    let num = 0
    for (let i = 0; i <= this.props.rowKey; i++) {
        num = i
    }
    return num
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
              <RowTable id={ this.createRows } />
            </tbody>
          </Table>
        </Wrapper>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, null)(ProductsTable)