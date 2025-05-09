import React from 'react';
import colors from '@/constants/colors';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputElement['type'];
  placeholder?: string;
  className?: string;
  id?: string;
}

function TextInput({
  type = 'text',
  placeholder,
  className,
  id,
  ...rest
}: Readonly<TextInputProps>) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder ?? ' '}
      className={`${className ?? ' '} rounded-[8] px-[10] py-[7] outline-none text-black`}
      style={{ backgroundColor: colors.C07 }}
      {...rest}
    />
  );
}

export default TextInput;
