import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
// Không có tính năng tree-shaking
// import { omit } from 'lodash'

// Import chỉ mỗi function omit
import omit from 'lodash/omit'

import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { schema, SchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { registerAccount } from 'src/apis'

// Form can only choose 1 of 3 types: email or password or confirm_password
type FormData = Pick<SchemaYup, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  // Declaration form
  const {
    register, // đk thông tin từng field cho form
    handleSubmit, // sự kiện submit form
    setError, // set lỗi cho field
    formState: { errors } // các trạng thái của form
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  // Mutations async create/update/delete-post/put/delete
  const registerAccountMutation = useMutation({
    /**
     Omit<FormData, 'confirm_password': delete confirm_password in FormData
     *
     * @param body 'email' && 'password'
     * @returns data then call api
     */
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  // Handle event
  const onSubmit = handleSubmit((data) => {
    // Use omit trong lodash loại bỏ confirm_password trong object schema
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      // call api thành công
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      // call api khi error
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              //key as keyof Omit<FormData, 'confirm_password': set key
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                //message: get error from sever
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className="bg-[url('https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745')]">
      <Helmet>
        <title>Đăng ký Test re-build | Shopee Clone</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>

      {/* Form */}
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>

              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.password?.message}
                placeholder='Password'
                autoComplete='on' // các input là passwork nên thêm trường này để tốt cho mặt UX
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                autoComplete='on' // các input là passwork nên thêm trường này để tốt cho mặt UX
              />

              <div className='mt-2'>
                <Button
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>

              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
