import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import TextInput from '@/components/input/TextInput';

export interface TextInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function TextInputWithLabel({
  label,
  id,
  type,
  placeholder,
  labelClassName,
  inputClassName,
  onChange,
}: Readonly<TextInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput className={labelClassName} label={label} id={id} />
      <TextInput
        placeholder={placeholder}
        className={inputClassName}
        type={type}
        id={id}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInputWithLabel;
