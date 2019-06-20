import { createStore, applyMiddleware } from 'redux'

import {
  CHANGE_VAT,
  CHANGE_DISCOUNT,
  UPLOAD_LOGO,
  ADD_KEY_ROW
} from './constants'

const initialState = {
  vat: 0,
  discount: 0,
  isLogoUploaded: false,
  rowKey: 0
}

// reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_VAT:
      state = {
        ...state,
        vat: action.payload
      }
    break;
    case CHANGE_DISCOUNT:
      state = {
        ...state,
        discount: action.payload
      }
    break;
    case UPLOAD_LOGO:
      state = {
        ...state,
        isLogoUploaded: action.payload
      }
    break;
    case ADD_KEY_ROW:
      state = {
        ...state,
        rowKey: action.payload + 1
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
