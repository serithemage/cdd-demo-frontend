import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, disabled, ...props }, ref) => {
    const baseStyles = 'h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50';
    
    const checkboxClasses = twMerge(
      baseStyles,
      error && 'border-red-500',
      className
    );

    return (
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={checkboxClasses}
            {...props}
          />
          {label && (
            <label className="ml-2 block text-sm text-gray-900">
              {label}
            </label>
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
