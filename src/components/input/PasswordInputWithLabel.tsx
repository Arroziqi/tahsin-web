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
}

function PasswordInputWithLabel({
  label,
  id,
  type,
  placeholder,
  labelClassName,
  inputClassName,
}: Readonly<PasswordInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput className={labelClassName} label={label} id={id} />
      <PasswordInput placeholder={placeholder} className={inputClassName} type={type} id={id} />
    </div>
  );
}

export default PasswordInputWithLabel;
