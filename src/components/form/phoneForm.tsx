import { phoneNumberSchema } from '@/core/schema'
import { RootState } from '@/core/store'
import { getFromSessionStorage } from '@/helper'
import { setPhoneNumber } from '@/modules'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { InputField } from './field'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface OtpFormProps {
  onSubmit: (phoneNumber: string) => void
  type: 'login' | 'update' | 'otpValidate'
}

export const PhoneForm = ({ onSubmit, type }: OtpFormProps) => {
  const dispatch = useDispatch()
  const { userInfo: { phone = '' } = { userInfo: undefined } } = useSelector(
    (state: RootState) => state.user
  )

  // useForm
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm({
    resolver: yupResolver(phoneNumberSchema),
    mode: 'all'
  })

  const handleSubmitForm = ({ phoneNumber }) => {
    sessionStorage.setItem('phoneNumberInput', phoneNumber)
    onSubmit(phoneNumber)
    dispatch(setPhoneNumber(phoneNumber))
  }

  return (
    <>
      <form className='form-control form-control-auth' onSubmit={handleSubmit(handleSubmitForm)}>
        <div className='form-item'>
          <InputField control={control} placeholder='Số điện thoại' name='phoneNumber' />
        </div>

        <button type='submit' className={`btn-primary ${!isValid ? 'btn-disabled' : ''}`}>
          Tiếp theo
        </button>
      </form>
    </>
  )
}
