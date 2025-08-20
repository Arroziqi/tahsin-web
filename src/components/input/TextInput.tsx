'use client';

import React, { forwardRef, useState } from 'react';
import colors from '@/constants/colors';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputElement['type'];
  placeholder?: string;
  className?: string;
  id?: string;
  validate?: (value: string) => string | null;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    type = 'text',
    placeholder,
    className,
    id,
    validate,
    onBlur,
    ...rest
  }: Readonly<TextInputProps>,
  ref
) {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      const message = validate(e.target.value);
      setError(message);
    }
    onBlur?.(e);
  };

  return (
    <div>
      <input
        ref={ref} // Add ref here
        id={id}
        type={type}
        placeholder={placeholder ?? ' '}
        className={`w-full ${className ?? ''} rounded-[8px] px-[10px] py-[7px] outline-none text-black ${
          error ? 'border border-red-500' : ''
        }`}
        style={{ backgroundColor: colors.C07 }}
        onBlur={handleBlur}
        {...rest}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default TextInput;
