import http from 'src/utils/http'
import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'

// !Create Call API to Server
const URL = 'categories'
const categoryApi = {
  getCategories: () => http.get<SuccessResponse<Category[]>>(URL)
}

export default categoryApi
