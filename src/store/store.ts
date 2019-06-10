import { createStore, applyMiddleware } from 'redux'

import { CHANGE_VAT, CHANGE_DISCOUNT, UPLOAD_LOGO } from './constants'

const initialState = {
  vat: 0,
  discount: 0,
  isLogoUploaded: false
}

// reducer
export function reducer(state = initialState, action: any) {
  if (action.type === CHANGE_VAT) {
    state = {
      ...state,
      vat: action.payload
    }
  } else if (action.type === CHANGE_DISCOUNT) {
    state = {
      ...state,
      discount: action.payload
    }
  } else if (action.type === UPLOAD_LOGO) {
    state = {
      ...state,
      isLogoUploaded: action.payload
    }
  }

  return state
}

const vatController = (state: any) => (next: any) => (action: any) => {
  if (action.type === CHANGE_VAT) {
    
  }
  next(action)
}

const store = createStore(reducer, {}, applyMiddleware(vatController))

export default store;
