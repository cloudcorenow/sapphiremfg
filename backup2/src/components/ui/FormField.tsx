import React, { useState } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  rows?: number;
  placeholder?: string;
  className?: string;
  validate?: (value: string) => string | null;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  options = [],
  rows = 4,
  placeholder,
  className = '',
  validate
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    if (validate) {
      const validationError = validate(value);
      setError(validationError);
    } else if (required && !value.trim()) {
      setError(`${label} is required`);
    } else {
      setError(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e);
    if (touched && error) {
      // Re-validate on change if there was an error
      if (validate) {
        const validationError = validate(e.target.value);
        setError(validationError);
      } else if (required && !e.target.value.trim()) {
        setError(`${label} is required`);
      } else {
        setError(null);
      }
    }
  };

  const fieldId = `field-${name}`;
  const errorId = `${fieldId}-error`;
  const hasError = touched && error;

  const baseClasses = `w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4A14D] focus:border-transparent text-white text-base transition-colors ${
    hasError ? 'border-red-500' : 'border-white/10'
  } ${className}`;

  return (
    <div>
      <label htmlFor={fieldId} className="block text-base font-medium text-gray-300 mb-2">
        {label}{required && <span className="text-red-400 ml-1" aria-label="required">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={rows}
          placeholder={placeholder}
          className={baseClasses}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError}
        />
      ) : type === 'select' ? (
        <select
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${baseClasses} select-dark`}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError}
        >
          {options.map(option => (
            <option key={option.value} value={option.value} className="bg-gray-900">
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={baseClasses}
          aria-describedby={hasError ? errorId : undefined}
          aria-invalid={hasError}
        />
      )}
      
      {hasError && (
        <p id={errorId} className="mt-2 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;