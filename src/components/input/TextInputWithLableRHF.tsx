// components/input/TextInputWithLabelRHF.tsx
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import TextInputWithLabel, { TextInputWithLabelProps } from '@/components/input/TextInputWithLabel';

interface TextInputWithLabelRHFProps extends Omit<TextInputWithLabelProps, 'onChange' | 'value'> {
  registration: UseFormRegisterReturn;
  error?: string;
}

function TextInputWithLabelRHF({
  registration,
  error,
  ...props
}: Readonly<TextInputWithLabelRHFProps>) {
  return (
    <div>
      <TextInputWithLabel
        {...props}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        name={registration.name}
        ref={registration.ref}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default TextInputWithLabelRHF;
