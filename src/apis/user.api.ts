import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

// !Create Call API to Server
/**
 * @param body data Client to Server
 * @returns data Server to Client
 */
interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}
const userApi = {
  getProfile: () => http.get<SuccessResponse<User>>('me'),
  updateProfile: (body: BodyUpdateProfile) => http.put<SuccessResponse<User>>('user', body),
  uploadAvatar: (body: FormData) =>
    http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export default userApi
