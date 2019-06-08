import React from 'react'
import { connect } from 'react-redux'

import { Wrapper } from './VAT.style'

const VatView = (state: any) => {
  return (
    <Wrapper>
      The price is subject to <span>{ state.vat }</span>% VAT
    </Wrapper>
  )
}

// Which part of the state I want to use in this component
// and which local property access from the props I want to map
const mapStateToProps = (state: any) => {
	return {
    vat: state.vat
  }
}

export default connect(mapStateToProps, null)(VatView);