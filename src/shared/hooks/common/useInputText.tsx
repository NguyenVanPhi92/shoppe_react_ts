import React, { useState } from "react"

interface UseInputTextRes {
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  clearValue: Function
}

const useInputText = (defaultValue = ""): UseInputTextRes => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value)
  }

  const clearValue = () => {
    setValue("")
  }

  return {
    value,
    onChange,
    clearValue,
  }
}

export { useInputText }
