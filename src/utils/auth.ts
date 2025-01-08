import { User } from 'src/types/user.type'

// Create a method that manages authentication whether the User is logged in or not
export const LocalStorageEventTarget = new EventTarget()
export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)
export const setRefreshTokenToLS = (refresh_token: string) => localStorage.setItem('refresh_token', refresh_token)
// Delete information in localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token') // Remove 'access_token' from 'localStorage'
  localStorage.removeItem('refresh_token') // Remove 'refresh_token' from 'localStorage'
  localStorage.removeItem('profile') // Remove 'profile' from 'localStorage'
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}
// Get access Token in localStorage
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
// Get refresh Token in localStorage
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''
// Get profile in localStorage
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null // vì khi lấy data từ localStorage ra sẽ là kiểu string vì thế chuyển sang kiểu json
}
// Save info User to localStorage
export const setProfileToLS = (profile: User) => localStorage.setItem('profile', JSON.stringify(profile))
