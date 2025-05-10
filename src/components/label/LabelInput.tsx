import React from 'react';

export interface LabelInputProps {
  label: string;
  id?: string;
  className?: string;
}

function LabelInput({ label, id, className }: Readonly<LabelInputProps>) {
  return (
    <label htmlFor={id ?? ''} className={`${className ?? ''} text-[12px] text-[#293540]`}>
      {label}
    </label>
  );
}

export default LabelInput;
