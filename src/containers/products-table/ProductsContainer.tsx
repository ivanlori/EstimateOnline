import React, { Fragment, FunctionComponent } from 'react'
import { connect } from 'react-redux';

import RowTable from './RowTable'
import { Table, Thead, Td, Wrapper } from './Products.style'

const mapStateToProps = (state: any) => {
  return {
    rowKey: state.rowKey
  }
}

export const ProductsTable: FunctionComponent = (props: any) => {
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
            {
              props.rowKey.forEach((el: any) => {
                (<RowTable />)
              })
            }
          </tbody>
        </Table>
      </Wrapper>
    </Fragment>
  )
}

export default connect(mapStateToProps, null)(ProductsTable)