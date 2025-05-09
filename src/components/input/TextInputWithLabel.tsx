import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import TextInput from '@/components/input/TextInput';

interface TextInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
}

function TextInputWithLabel({ label, id, type }: Readonly<TextInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput label={label} id={id} />
      <TextInput type={type} id={id} />
    </div>
  );
}

export default TextInputWithLabel;
