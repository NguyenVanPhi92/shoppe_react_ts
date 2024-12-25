import React, { useEffect, useRef } from "react"
import { IoCloseCircle } from "react-icons/io5"
import { RiSearchLine } from "react-icons/ri"
import { useDebounce, useInputText } from "shared/hook"

type SearchFormProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, any> & {
  onSubmit?: (_: string) => void
  onChange?: (_: string) => void
  onChangeWithDebounceValue?: (_: string) => void
  timer?: number
  device?: "mobile" | "desktop"
}

export const SearchForm = ({
  onSubmit: onSubmitExternal,
  timer = 500,
  onChangeWithDebounceValue,
  device = "desktop",
  ...attributes
}: SearchFormProps) => {
  const { clearValue, onChange, value } = useInputText()
  const ref = useRef<HTMLInputElement>(null)
  const valDebounce = useDebounce(value, timer)

  const handleSubmit = () => {
    onSubmitExternal?.(value)
  }

  useEffect(() => {
    onChangeWithDebounceValue?.(valDebounce)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valDebounce])

  return (
    <form
      className="form__search"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <input
        {...attributes}
        ref={ref}
        className="form__search-input"
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e)
          const { value } = e.target
          attributes?.onChange?.(value)
        }}
        placeholder={attributes?.placeholder || "Tìm kiếm sản phẩm"}
      />

      <span
        className={`btn-reset form__search-input-clear ${
          value ? "form__search-input-clear-active" : ""
        }`}
        onClick={() => {
          clearValue()
          attributes?.onChange?.("")
        }}
      >
        <IoCloseCircle />
      </span>

      <button onClick={handleSubmit} className="btn-reset form__search-btn">
        <RiSearchLine />
      </button>
    </form>
  )
}
