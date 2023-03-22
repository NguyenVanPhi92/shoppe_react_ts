import { User } from 'src/types/user.type'

//Tạo các method quản lý việc xác thực User đã đăng nhập hay chưa

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

// Xóa thông tin trong localStorage
export const clearLS = () => {
  localStorage.removeItem('access_token') // Xóa access_token ra khỏi localStorage
  localStorage.removeItem('refresh_token') // Xóa refresh_token ra khỏi localStorage
  localStorage.removeItem('profile') // Xóa profile ra khỏi localStorage
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

// Lấy ra access Token trong localStorage
export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''

// Lấy ra refresh Token trong localStorage
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

// Lấy ra profile trong localStorage
export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null // vì khi lấy data từ localStorage ra sẽ là kiểu string vì thế chuyển sang kiểu json
}

//Lưu info User vào localStorage
export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
