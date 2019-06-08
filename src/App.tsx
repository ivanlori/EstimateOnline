import React, { Component } from 'react'
import styled from 'styled-components'
import { Normalize } from 'styled-normalize'

import { LogoUpload } from './containers/logo-upload/LogoUpload.view'
import { Wrapper, Title, GlobalStyle, Footer } from './styles/global.style'
import { InputView } from './components/input/Input.view'
import { TextareaView } from './components/textarea/Textarea.view'
import { Total } from './containers/total/Total.view'
import { Subtotal } from './containers/subtotal/Subtotal.view'
import UserBarContainer from './containers/user-bar/UserBarContainer'
import ProductsContainer from './containers/products-table/ProductsContainer'
import Datepicker from './components/Datepicker'
import DiscountContainer from './components/discount/Discount.container'
import VatContainer from './components/vat/VAT.container'
import VatView from './components/vat/VAT.view'

const companyInputStyle: React.CSSProperties = {
  float: 'right',
  width:'60%',
  margin: '5px 0'
}

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Wrapper>
          <Title>
            <h2>Job Estimate</h2>
          </Title>
          <CompanyData>
            <LogoUpload />
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
            <Datepicker />
            <DiscountContainer />
            <VatContainer />
            <Notes>
              <TextareaView
                placeholder="Add some notes..."
                style="width: 100px; height: 80px;"
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
      </React.Fragment>
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
  float: right;
  width: 500px;

  textarea {
    width: 478px;
    height: 65px;
  }
`
