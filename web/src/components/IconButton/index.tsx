import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function IconButton({ children, className = '', ...rest }: IconButtonProps) {
  return (
    <button
      className={`flex items-center justify-center rounded-lg bg-gray-200 p-2 text-gray-500 transition-colors hover:bg-gray-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}