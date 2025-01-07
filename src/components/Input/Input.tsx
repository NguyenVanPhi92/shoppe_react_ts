import { InputHTMLAttributes, useState } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { EyeHide, EyeShow } from 'src/assets/icons/eye'

// Props inherit InputHtml node properties
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  classNameEye?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

/**
 *
 * @param param attribute
 * @returns event input
 * toggle eye
 * input validation
 */
export default function Input({
  errorMessage,
  className,
  name,
  register,
  rules,
  classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
  classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
  classNameEye = 'absolute top-[8px] right-[5px] h-5 w-5 cursor-pointer',
  ...rest // ...rest are all attributes
}: Props) {
  const [openEye, setOpenEye] = useState(false)
  const registerResult = register && name ? register(name, rules) : null

  // handle event toggle eye
  const toggleEye = () => setOpenEye((prev) => !prev)

  const handleType = () => {
    if (rest.type === 'password') return openEye ? 'text' : 'password'
    return rest.type
  }

  return (
    <div className={'relative ' + className}>
      <input className={classNameInput} {...registerResult} {...rest} type={handleType()} />

      {rest.type === 'password' && !openEye && <EyeHide classNameEye={classNameEye} toggleEye={toggleEye} />}
      {rest.type === 'password' && openEye && <EyeShow classNameEye={classNameEye} toggleEye={toggleEye} />}

      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
