'use client';

import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import TextAreaWithLabel, { TextAreaWithLabelProps } from '@/components/input/TextAreaWithLabel';

interface TextAreaWithLabelRHFProps
  extends Omit<TextAreaWithLabelProps, 'onChange' | 'value' | 'name'> {
  /** hasil dari register('fieldName') */
  registration: UseFormRegisterReturn;
  error?: string;
}

const TextAreaWithLabelRHF: React.FC<TextAreaWithLabelRHFProps> = ({
  registration,
  error,
  ...props
}) => {
  return (
    <div>
      <TextAreaWithLabel
        {...props}
        name={registration.name}
        onChange={registration.onChange}
        onBlur={registration.onBlur}
        ref={registration.ref}
        error={error}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaWithLabelRHF;
