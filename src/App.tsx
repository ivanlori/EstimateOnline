import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Normalize } from 'styled-normalize'

import { Wrapper, Title, GlobalStyle, Footer } from './styles/global.style'
import { InputView } from './components/input/Input.view'
import { TextareaView } from './components/textarea/Textarea.view'
import { Total } from './containers/total/Total.view'
import { Subtotal } from './containers/subtotal/Subtotal.view'
import ProductsContainer from './containers/products-table/ProductsContainer'
import LogoUploadContainer from './containers/logo/LogoContainer'
import UserBarContainer from './containers/user-bar/UserBarContainer'
import DatepickerContainer from './components/Datepicker.container'
import DiscountContainer from './components/discount/Discount.container'
import VatContainer from './components/vat/VAT.container'

const companyInputStyle: React.CSSProperties = {
  float: 'right',
  width:'60%',
  margin: '5px 0'
}

const notesStyle: React.CSSProperties = {
  width: '100%',
  height: '80px',
  boxSizing: 'border-box'
}

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Normalize />
        <GlobalStyle />
        <Wrapper>
          <Title>
            <h2>Job Estimate</h2>
          </Title>
          <CompanyData>
            <LogoUploadContainer />
            <CompanyReferences>
              <label>Information about your Company</label>
              <InputView
                type="text"
                placeholder="info@company.com"
                style={ companyInputStyle }
              />
              <InputView
                type="text"
                placeholder="www.companywebsite.com"
                style={ companyInputStyle }
              />
              <InputView
                type="text"
                placeholder="Telephone"
                style={ companyInputStyle }
              />
              <TextareaView
                placeholder="Company address"
                style={ companyInputStyle }
              />
            </CompanyReferences>
          </CompanyData>
          <div className="page__data clearfix">
            <DatepickerContainer />
            <DiscountContainer />
            <VatContainer />
            <Notes>
              <TextareaView
                placeholder="Add some notes..."
                style={ notesStyle }
                label="Notes"
              />
            </Notes>
          </div>
          <ProductsContainer />
          <Footer>
            <Subtotal />
            <Total />
          </Footer>
          <UserBarContainer />
        </Wrapper>
      </Fragment>
    )
  }
}

const CompanyData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 240px;
`

const CompanyReferences = styled.div`
  text-align: right;
`

const Notes = styled.div`
  width: 50%;
  float: right;
`
