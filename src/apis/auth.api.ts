import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from 'src/constants'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

// !Create Call API to Server
/**
 * @param body data Client to Server
 * @returns data Server to Client
 */
export const registerAccount = (body: { email: string; password: string }) => {
  // AuthResponse: validate type response
  return http.post<AuthResponse>(URL_REGISTER, body)
}
export const login = (body: { email: string; password: string }) => http.post<AuthResponse>(URL_LOGIN, body)
export const logout = () => http.post(URL_LOGOUT)
