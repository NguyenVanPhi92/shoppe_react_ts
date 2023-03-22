// dữ liệu trả về thành công và Data sẽ có dữ liệu
export interface SuccessResponse<Data> {
  message: string
  data: Data
}

// dữ liệu trả về thất bại và Data có thể undefiend
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

// cú pháp `-?` sẽ loại bỏ undefiend của key optional
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
