import { ButtonHTMLAttributes } from 'react'
import Spinner from 'src/assets/icons/spinner'

// Kế thừa các thuộc tính của button Html
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

// ...rest all attributes
export default function Button({ className, isLoading, disabled, children, ...rest }: ButtonProps) {
  const newClassName = disabled ? className + ' cursor-not-allowed' : className // active button or disabled

  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {isLoading && <Spinner />}

      <span>{children}</span>
    </button>
  )
}
