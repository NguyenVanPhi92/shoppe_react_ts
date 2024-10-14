import { useState } from 'react'

interface UseInputTextRes {
  value: string
  onChange: (_: string) => void
  clearValue: Function
}

const useInputText = (defaultValue = ''): UseInputTextRes => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (_: string) => {
    setValue(_)
  }

  const clearValue = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    clearValue,
  }
}

export { useInputText }
