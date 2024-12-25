import React, { useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri'

type PasswordFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
}

export const PasswordField = ({
  className = '',
  label,
  control,
  name,
  defaultValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...attributes
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue
  })

  return (
    <div className={`form-item ${className}`}>
      {label && (
        <label htmlFor={name} className='form-label text-gray-color-7'>
          {label}
          {attributes?.required ? '(*)' : ''}
        </label>
      )}

      <div className='form-item-wrapper'>
        <input
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          value={value}
          className={`form-item-input ${error ? 'form-item-input-error' : ''}`}
          id={name}
          type={showPassword ? 'text' : 'password'}
          {...attributes}
        />

        <span
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)'
          }}
          onClick={() => setShowPassword((prev) => !prev)}
          className='form-item-input-pw-icon'
        >
          {!showPassword ? <RiEyeCloseLine /> : <RiEyeFill />}
        </span>
      </div>

      {error ? <p className='form-err-msg'>{error?.message}</p> : null}
    </div>
  )
}
