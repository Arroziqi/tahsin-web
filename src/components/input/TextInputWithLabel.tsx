import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import TextInput from '@/components/input/TextInput';

interface TextInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
}

function TextInputWithLabel({
  label,
  id,
  type,
  placeholder,
  labelClassName,
  inputClassName,
}: Readonly<TextInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput className={labelClassName} label={label} id={id} />
      <TextInput placeholder={placeholder} className={inputClassName} type={type} id={id} />
    </div>
  );
}

export default TextInputWithLabel;
