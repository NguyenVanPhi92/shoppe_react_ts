import React, { ReactNode } from 'react'
import { Spinner } from '../spinner'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean
  title?: string
  icon?: ReactNode
  colorType?: 'primary' | 'warning' | 'error' | 'info' | 'secondary' | 'success' | 'danger'
  btnType?: 'outline' | 'contained'
}

export const Button = ({
  title,
  icon,
  style,
  colorType = 'primary',
  loading = false,
  btnType = 'contained',
  ...attributes
}: ButtonProps) => {
  return (
    <button
      className={`btn ${attributes?.disabled ? 'pointer-events-none' : ''}`}
      disabled={attributes?.disabled || loading}
      onClick={(e) => !loading && !attributes.disabled && attributes?.onClick?.(e)}
      {...attributes}
    >
      <>
        {loading ? (
          <Spinner className="w-[16px] h-[16px] mr-[8px]" />
        ) : icon ? (
          <span className="mr-[8px]">{icon}</span>
        ) : null}

        {title ? <p className="text-base">{title}</p> : null}
      </>
    </button>
  )
}
