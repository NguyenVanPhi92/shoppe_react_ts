import React from 'react'
import { Control, useController } from 'react-hook-form'

type TextareaFieldProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
}

export const TextareaField = ({
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
}: TextareaFieldProps) => {
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
          <textarea
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            style={{ height: `${name === 'content' && '160px'}` }}
            className={`form-item-input ${error ? 'form-item-input-error' : ''}`}
            value={value}
            {...attributes}
          />
        </div>
        {error ? <p className='form-err-msg'>{error?.message}</p> : null}
      </div>
    </div>
  )
}
