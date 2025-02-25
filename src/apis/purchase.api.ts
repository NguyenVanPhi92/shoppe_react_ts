import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

// !Create Call API to Server
/**
 * @param body data Client to Server
 * @returns data Server to Client
 */
const URL = 'purchases'
const purchaseApi = {
  // Sử dụng generic types (<SuccessResponse<Purchase>>) giúp đảm bảo an toàn kiểu dữ liệu, đặc biệt khi làm việc với TypeScript.
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),
  getPurchases: (params: { status: PurchaseListStatus }) => http.get<SuccessResponse<Purchase[]>>(`${URL}`, { params }),
  buyProducts: (body: { product_id: string; buy_count: number }[]) =>
    http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body),
  updatePurchase: (body: { product_id: string; buy_count: number }) =>
    http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body),
  deletePurchase: (purchaseIds: string[]) => {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, { data: purchaseIds })
  }
}

export default purchaseApi
