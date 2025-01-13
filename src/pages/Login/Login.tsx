import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from 'src/apis'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorResponse } from 'src/types/utils.type'
import { SchemaYup, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

// type the form
// Form can only select 1 of 2 fields: email or password
type FormData = Pick<SchemaYup, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  // Call state in ContextAPI
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  // Declaration form
  const {
    register, // đk thông tin từng files vào useForm của react hook form
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  // Mutate async: POST, PUT, DELETE
  const loginMutation = useMutation({
    /**
     *
     * @param body is data đc truyền từ form input
     * @returns Promise async function
     * Omit: dùng type của formData nhưng loại bỏ confirm_password
     */
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })
  // Handle event
  const onSubmit = handleSubmit((data) => {
    /**
     * @param data Event submit form login success or failed
     * data là data từ form người dùng nhập vào
     */
    loginMutation.mutate(data, {
      // gọi sự kiện thành công sau khi call API
      onSuccess: (data) => {
        setIsAuthenticated(true) // auth = true
        setProfile(data.data.data.user) // lưu info user vào store context
        navigate('/')
      },
      // gọi sự kiện thất bại sau khi call API
      onError: (error) => {
        // nếu như response trả về error
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              // key as keyof FormData => key as keyof: chỉ định key sẽ chỉ có là email or password
              setError(key as keyof FormData, { message: formError[key as keyof FormData], type: 'Server' })
            })
          }
        }
      }
    })
  })

  return (
    <div className="bg-[url('https://down-vn.img.susercontent.com/file/sg-11134004-7rdww-lz7fzhaqivg745')]">
      <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>

      {/* Form */}
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng nhập</div>
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
                autoComplete='on'
              />

              <div className='mt-3'>
                <Button
                  type='submit'
                  className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 flex items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
