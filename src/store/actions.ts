import * as constants from './constants'

export const changeVat = (value: number) => ({
  type: constants.CHANGE_VAT,
  payload: value
})

export const changeDiscount = (value: number) => ({
  type: constants.CHANGE_DISCOUNT,
  payload: value
})

export const logoUpload = (value: string) => ({
  type: constants.UPLOAD_LOGO,
  payload: value
})