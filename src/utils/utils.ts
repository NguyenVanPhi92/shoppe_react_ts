import axios, { AxiosError } from 'axios'
import config from 'src/constants/config'
import userImage from 'src/assets/images/user.svg'
import { ErrorResponse } from 'src/types/utils.type'
import { HttpStatusCode } from 'src/constants'
// xem video 145 phut thu 5

// function check có phải lỗi của axios không
// fuction sẽ trả về kiểu  error is AxiosError<T> => là 1 dạng lõi ép kiểu sang axios
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
// Is the function check error a 422 error?
/**
 *
 * @param error check error cli
 * @returns error to server error
 */
// <FormError>: định nghĩa kiểu dữ liệu nhận vào
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
// format giá tiền theo .
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}
// format giá tiền theo 'k'
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
export const getAvatarUrl = (avatarName?: string) => (avatarName ? `${config.baseUrl}images/${avatarName}` : userImage)
