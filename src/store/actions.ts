import * as constants from './constants'

export const changeVat = (value: any) => ({
  type: constants.CHANGE_VAT,
  payload: value
})

export const changeDiscount = (value: any) => ({
  type: constants.CHANGE_DISCOUNT,
  payload: value
})

export const logoUpload = (value: any) => ({
  type: constants.UPLOAD_LOGO,
  payload: value
})

export const addRow = (value: number) => ({
  type: constants.ADD_KEY_ROW,
  payload: value
})