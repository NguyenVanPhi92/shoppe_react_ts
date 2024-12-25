import { OptionType } from '@/models'
import { Control, useController } from 'react-hook-form'
import Select, { Props } from 'react-select'

type SelectFieldProps = Props & {
  name: string
  control: Control
  onChange?: (_: OptionType<any>) => void
}

export const SelectField = ({
  name,
  control,
  defaultValue,
  onChange: onChangeProps,
  ...attributes
}: SelectFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue
  })

  return (
    <>
      <Select
        ref={ref}
        id={name}
        classNamePrefix='custom-select'
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: error ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.2)',
            boxShadow: 'none',
            '&:hover': {
              border: error ? '1px solid red' : '1px solid rgba(0, 0, 0, 0.2)'
            },
            color: 'red',
            backgroundColor: error && '#ffeef2 !important'
          })
        }}
        onBlur={onBlur}
        onChange={(val) => {
          onChangeProps?.(val)
          onChange(val)
        }}
        value={value}
        {...attributes}
      />
      {error?.message && <div className='form-err-msg'>{error.message}</div>}
    </>
  )
}
