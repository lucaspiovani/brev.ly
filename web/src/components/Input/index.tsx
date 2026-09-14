import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase text-gray-500">
          {label}
        </label>
        <input
          ref={ref}
          className={`rounded-lg border px-4 py-2 text-md text-gray-600 outline-none placeholder:text-gray-400 focus:border-blue-base ${
            error ? 'border-danger' : 'border-gray-300'
          } ${className}`}
          {...rest}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'