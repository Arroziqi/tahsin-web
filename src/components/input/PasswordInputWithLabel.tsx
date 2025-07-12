import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import PasswordInput from '@/components/input/PasswordInput';

interface PasswordInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: string) => string | null;
  value?: string;
}

function PasswordInputWithLabel({
  label,
  id,
  type,
  placeholder,
  labelClassName,
  inputClassName,
  onChange,
  validate,
  value,
}: Readonly<PasswordInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput className={labelClassName} label={label} id={id} />
      <PasswordInput
        placeholder={placeholder}
        className={inputClassName}
        type={type}
        id={id}
        onChange={onChange}
        validate={validate}
        value={value}
      />
    </div>
  );
}

export default PasswordInputWithLabel;
