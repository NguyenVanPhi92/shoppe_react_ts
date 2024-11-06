import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode, URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/constants'
import config from 'src/constants/config'
import { AuthResponse, RefreshTokenReponse } from 'src/types/auth.type'
import { ErrorResponse } from 'src/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'

// Purchase: 1 - 3
// Me: 2 - 5
// Refresh Token cho purchase: 3 -  4
// Gọi lại Purchase: 4 - 6
// Refresh Token mới cho me: 5 - 6
// Gọi lại Me: 6

// Setup axios instance các kiểu response trả về và gán các token, access token, refesh token vào localStorage
export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl, // thiết lập base api - api dùng chung cho tất cả
      timeout: 10000, // sau 10s thì không gọi api
      // config headers
      headers: {
        'Content-Type': 'application/json', // The client sends json to the server and receives json back
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        // default refresh  bigger to access
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })

    /**
     * Xử lý các route cần xác thực token
     * request cli to server
     */
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken // truyền token vào authorization
          return config
        }
        return config
      },
      // lỗi totken
      (error) => {
        return Promise.reject(error)
      }
    )

    /**
     * Xử lý lưu các token vào trong localStorage
     * response server to cli
     */
    this.instance.interceptors.response.use(
      // dùng arrow function mới truy cập đc this
      (response) => {
        const { url } = response.config // lấy ra url trong response trả về khi const api
        // Xử lý khi là login và register
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse // gán kiểu data reponse

          this.accessToken = data.data.access_token // lưu access_token vào biến
          this.refreshToken = data.data.refresh_token // lưu refresh_token vào biến

          // Lưu các token vào localStorage
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS() // xóa hết thông tin trong localStorage
        }
        return response
      },

      // handler error msg server send cli
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message // nếu server lỗi và trả về kiểu string html thì sẽ lấy error message của axios show lên
          toast.error(message) // send error to toastyfi
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
