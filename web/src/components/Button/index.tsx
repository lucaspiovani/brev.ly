import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) {
  const variants = {
    primary:
      'bg-blue-base text-white hover:bg-blue-dark disabled:bg-gray-200 disabled:text-gray-400',
  }

  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-md font-bold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
