'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import colors from '@/constants/colors';

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputElement['type'];
  placeholder?: string;
  className?: string;
  id?: string;
  validate?: (value: string) => string | null;
}

function PasswordInput({
  type = 'password',
  placeholder,
  className,
  id,
  validate,
  ...rest
}: Readonly<PasswordInputProps>) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      const message = validate(e.target.value);
      setError(message);
    }
  };

  return (
    <div>
      <div className="relative w-full items-center">
        <input
          id={id}
          type={showPassword ? 'text' : type}
          placeholder={placeholder ?? ' '}
          className={`w-full rounded-[8px] px-[10px] py-[7px] outline-none text-black ${
            error ? 'border border-red-500' : ''
          } pr-9 ${className ?? ''}`}
          style={{ backgroundColor: colors.C07 }}
          onBlur={handleBlur}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ color: colors.C02 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default PasswordInput;
