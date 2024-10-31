import { ButtonHTMLAttributes } from 'react'
import Spinner from 'src/assets/icons/spinner'

// ButtonProps inherit ButtonHtml node properties
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

// ...rest are all attributes
export default function Button({ className, isLoading, disabled, children, ...rest }: ButtonProps) {
  // active button or disabled
  const newClassName = disabled ? className + ' cursor-not-allowed' : className

  return (
    <button className={newClassName} disabled={disabled} {...rest}>
      {isLoading && <Spinner />}

      <span>{children}</span>
    </button>
  )
}
