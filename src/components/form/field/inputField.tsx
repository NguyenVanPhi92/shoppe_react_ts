import React, { HTMLInputTypeAttribute, useState } from 'react'
import { Control, useController } from 'react-hook-form'

type InputFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
}

export const InputField = ({
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
}: InputFieldProps) => {
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
        <label htmlFor={name} className='form-label'>
          {label}
          {attributes?.required ? '(*)' : ''}
        </label>
      )}

      <div className='form-item-inner'>
        <div className='relative'>
          <input
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            value={value}
            className={`form-item-input ${error ? 'form-item-input-error' : ''}`}
            id={name}
            {...attributes}
            type='text'
          />
        </div>

        {error ? <p className='form-err-msg'>{error?.message}</p> : null}
      </div>
    </div>
  )
}
