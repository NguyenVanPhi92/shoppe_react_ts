// data returns successfully and Data will have data
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// Data is returned 'unsuccessfully' and Data maybe 'Undefine'
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

// cú pháp `-?` sẽ loại bỏ 'Undefine' của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
