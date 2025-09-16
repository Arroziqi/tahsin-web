'use client';

import React from 'react';
import colors from '@/constants/colors';

export interface TextAreaWithLabelProps {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  className?: string;
  labelClassName?: string;
  textAreaClassName?: string;
  error?: string;
  id?: string;
  name?: string;
  maxLength?: number;
}

/**
 * TextAreaWithLabel
 * Textarea dengan label & error message, siap diintegrasikan dengan RHF
 */
const TextAreaWithLabel = React.forwardRef<HTMLTextAreaElement, TextAreaWithLabelProps>(
  (
    {
      label,
      value,
      onChange,
      required = false,
      disabled = false,
      placeholder = '',
      rows = 3,
      className = '',
      labelClassName = '',
      textAreaClassName = '',
      error = '',
      id,
      name,
      maxLength,
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${className} text-gray-700`}>
        {label && (
          <label
            htmlFor={id}
            className={`mb-1 text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          style={{ backgroundColor: colors.C07 }}
          className={`px-3 py-2 outline-0 rounded-lg shadow-sm ${
            error ? 'border border-red-500' : ''
          } ${textAreaClassName}`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextAreaWithLabel.displayName = 'TextAreaWithLabel';

export default TextAreaWithLabel;
