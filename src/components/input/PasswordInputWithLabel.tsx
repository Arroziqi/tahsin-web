import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import PasswordInput from '@/components/input/PasswordInput';

interface PasswordInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
}

function PasswordInputWithLabel({ label, id, type }: Readonly<PasswordInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput label={label} id={id} />
      <PasswordInput type={type} id={id} />
    </div>
  );
}

export default PasswordInputWithLabel;
