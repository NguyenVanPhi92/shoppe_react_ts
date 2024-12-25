import { AuthContainer } from '@/container'
import { loginSchema } from '@/core/schema'
import { ILogin } from '@/models'
import { setOpenLoginModal, setOpenOtpLoginModal, setToken, setUserInfo } from '@/modules'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useAuth } from 'shared/hook'
import { InputField } from './field'
import { PasswordField } from './field/passwordField'

interface LoginFormProps {
  view: 'page' | 'modal'
}

export const LoginForm = ({ view }: LoginFormProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loginWithPassword, getUserInfo } = useAuth()

  useEffect(() => {
    ;(document.querySelector('.form-item-input') as HTMLInputElement).focus()
  }, [])

  // useForm
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'all'
  })

  const handleLogin = (data: ILogin) => {
    loginWithPassword(data, (token) => {
      dispatch(setToken(token))
      getUserInfo({
        token,
        onSuccess: (userInfo) => {
          dispatch(setUserInfo(userInfo))
          if (view === 'modal') {
            router.reload()
          } else {
            router.push('/')
          }
        }
      })
    })
  }

  return (
    <AuthContainer view={view} heading='Đăng nhập' type='login'>
      {view === 'modal' && (
        <button
          onClick={() => {
            dispatch(setOpenLoginModal(false))
            dispatch(setOpenOtpLoginModal(false))
          }}
          className='btn-reset modal__login-close-btn'
        >
          <IoClose />
        </button>
      )}

      <form className='form-control form-control-auth' onSubmit={handleSubmit(handleLogin)}>
        <InputField control={control} name='phone' type='text' placeholder='Số điện thoại' />
        <div className='relative'>
          <PasswordField control={control} name='password' placeholder='Mật Khẩu' />
        </div>

        <button type='submit' className={`btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
          Đăng nhập
        </button>

        <div className='form-item-forgot-pw'>
          <Link href='/reset_password'>
            <a onClick={() => dispatch(setOpenLoginModal(false))}>Quên mật khẩu</a>
          </Link>
        </div>
      </form>
    </AuthContainer>
  )
}
