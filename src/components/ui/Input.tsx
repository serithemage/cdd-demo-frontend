import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';
    
    const inputClasses = twMerge(
      baseStyles,
      error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
      fullWidth && 'w-full',
      (leftIcon || rightIcon) && 'flex items-center',
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      className
    );

    const wrapperClasses = twMerge(
      'relative',
      fullWidth && 'w-full'
    );

    const iconClasses = 'absolute top-1/2 transform -translate-y-1/2 text-gray-500';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftIcon && (
            <span className={`${iconClasses} left-3`}>
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          {rightIcon && (
            <span className={`${iconClasses} right-3`}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
