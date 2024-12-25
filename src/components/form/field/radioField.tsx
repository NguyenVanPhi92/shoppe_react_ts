import React from 'react'
import { Control, useController } from 'react-hook-form'
import { OptionType } from '../../../../models/common'
import { InputCheckbox } from '../inputs/inputCheckbox'

type RadioFieldProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  control: Control<any>
  name: string
  className?: string
  label?: string
  data: OptionType<string>[]
  defaultValue?: string | undefined
}

export const RadioField = ({
  className = '',
  label,
  control,
  name,
  defaultValue,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  data,
  ...attributes
}: RadioFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue
  })

  const handleChange = (val: OptionType<string>) => {
    onChange(val.value)
  }

  return (
    <div ref={ref} className='flex items-center justify-start'>
      {data.map((item) => (
        <div key={item.value} className='mr-12 flex items-center'>
          <InputCheckbox type='radio' isChecked={value === item.value} onCheck={() => handleChange(item)} />
          <p onClick={() => handleChange(item)} className='ml-8 cursor-default text-sm'>
            {item.label}
          </p>
        </div>
      ))}
      {label && (
        <label htmlFor={name} className='form-label'>
          {label}
          {attributes?.required ? '(*)' : ''}
        </label>
      )}

      {error ? <p className='form-err-msg'>{error?.message}</p> : null}
    </div>
  )
}
