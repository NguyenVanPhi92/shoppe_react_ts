import { OtpForm, PhoneForm } from '@/components'
import { AuthContainer } from '@/container'
import { authentication } from '@/core/config'
import { RootState } from '@/core/store'
import {
  clearAuthData,
  setCurrentToken,
  setOpenLoginModal,
  setOpenLoginSMSModal,
  setOpenOtpLoginModal,
  setOpenScreenLoading,
  setToken,
  setUserInfo,
  setValidateCreatePasswordOTP
} from '@/modules'
import userApi from '@/services/userApi'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { HiOutlineArrowSmLeft } from 'react-icons/hi'
import { IoArrowBack, IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from 'reapop'
import { useAuth } from 'shared/hook'

declare global {
  interface Window {
    recaptchaVerifier: any
    confirmationResult: any
  }
}

interface LoginOTPProps {
  type: 'updatePhoneNumber' | 'login' | 'createNewPassword'
  view: 'page' | 'modal'
}

export const OTP = ({ type, view }: LoginOTPProps) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const phoneNumberRef = useRef<string>()
  const { loginWithPhoneNumber, updatePhoneNumber, getUserInfo, OTPVerifier } = useAuth()
  const { currentUserInfo, phoneNumber, currentToken } = useSelector((state: RootState) => state.auth)
  const { token } = useSelector((state: RootState) => state.user)
  const [expandForm, setExpandForm] = useState<boolean>(false)

  const generateRecaptcha = () => {
    return new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible'
      },
      authentication
    )
  }

  // Generate OTP input
  const generateOtpCode = async (phoneNumber: string) => {
    dispatch(setOpenScreenLoading(true))

    if (type === 'updatePhoneNumber') {
      const res: any = await userApi.checkPhoneExist(phoneNumber || '')
      if (!res?.result?.success || res?.result?.data?.phone_already_exists) {
        dispatch(dispatch(notify(res?.result?.data?.message || 'Số điện thoại đã tồn tại', 'warning')))
        dispatch(setOpenScreenLoading(false))
        return
      }
    }

    const verify = generateRecaptcha()
    if (!phoneNumber) return

    try {
      const confirmationResult = await signInWithPhoneNumber(authentication, `+84${phoneNumber.slice(1)}`, verify)
      dispatch(setOpenScreenLoading(false))
      phoneNumberRef.current = phoneNumber
      window.confirmationResult = confirmationResult

      setExpandForm(true)
    } catch (error) {
      dispatch(setOpenScreenLoading(false))
      generateRecaptcha()
    }
  }

  // Validate OTP
  const handleVerifyOTP = async (otpInput: string) => {
    if (type === 'updatePhoneNumber') {
      updatePhoneNumber({
        otpInput,
        handleSuccess: () => {
          if (currentToken) {
            dispatch(setToken(currentToken))
          }
          if (currentUserInfo?.id) {
            dispatch(setUserInfo({ ...currentUserInfo, phone: phoneNumber || '' }))
          }

          if (view === 'modal') {
            // dispatch(setOpenOtpLoginModal(false))
            router.reload()
          }
          router.push('/')
          dispatch(clearAuthData())
        },
        handleError: () => {
          setExpandForm(false)
        }
      })
    } else if (type === 'login') {
      loginWithPhoneNumber({
        otpInput,
        handleSuccess: (token) => {
          dispatch(setToken(token))
          setTimeout(() => {
            getUserInfo({
              token,
              onSuccess: (userInfo) => {
                dispatch(setUserInfo(userInfo))
                if (view === 'page') {
                  router.push('/')
                } else {
                  router.reload()
                }
              }
            })
          }, 100)
        },
        handleError: (res: any) => {
          dispatch(dispatch(notify(res?.result?.message || 'Đăng nhập không thành công', 'error')))
        }
      })
    } else if (type === 'createNewPassword') {
      if (token) {
        OTPVerifier({
          otpInput,
          handleSuccess: () => {
            dispatch(setValidateCreatePasswordOTP(true))
          }
        })
      } else {
        loginWithPhoneNumber({
          otpInput,
          handleSuccess: (currentToken) => {
            dispatch(setCurrentToken(currentToken))
            dispatch(setValidateCreatePasswordOTP(true))
          }
        })
      }
    }
  }

  const heading =
    type === 'login'
      ? 'Đăng nhập bằng số điện thoại'
      : type === 'createNewPassword'
      ? 'Đặt lại mật khẩu'
      : 'Vui lòng cập nhật số điện thoại'

  const handleClose = () => {
    if (type === 'login') {
      dispatch(setOpenLoginSMSModal(false))
    } else if (type === 'updatePhoneNumber') {
      dispatch(setOpenOtpLoginModal(false))
      dispatch(clearAuthData())
    }
  }

  return (
    <>
      {!expandForm ? (
        <AuthContainer view={view} heading={heading} type={type}>
          {view === 'modal' ? (
            <>
              <button onClick={handleClose} className='btn-reset modal__otp-close-btn'>
                <IoClose />
              </button>

              {router.pathname !== '/login' ? (
                <button
                  onClick={() => {
                    dispatch(setOpenLoginSMSModal(false))
                    dispatch(setOpenLoginModal(true))
                  }}
                  className='btn-reset modal__otp-back-btn'
                >
                  <IoArrowBack />
                </button>
              ) : null}
            </>
          ) : null}
          <PhoneForm type='login' onSubmit={(phone) => generateOtpCode(phone)} />
        </AuthContainer>
      ) : (
        <AuthContainer view={view} type='otp'>
          <button onClick={handleClose} className='btn-reset modal__otp-close-btn'>
            <IoClose />
          </button>

          <div className='otp-container'>
            <header className='otp__header'>
              <button onClick={() => setExpandForm(false)} className='btn-reset otp__header-btn'>
                <HiOutlineArrowSmLeft />
              </button>
              <p className='otp__header-heading'>Vui Lòng Nhập Mã Xác Minh</p>
            </header>

            <div className='otp__form'>
              <OtpForm
                reGenerateRecaptcha={() => generateOtpCode(phoneNumber || '')}
                phoneNumber={phoneNumberRef.current || ''}
                onSubmit={(val) => handleVerifyOTP(val)}
                type={type}
              />
            </div>
          </div>
        </AuthContainer>
      )}

      <div id='recaptcha-container'></div>
    </>
  )
}
