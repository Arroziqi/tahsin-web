// SelectInput.tsx
import React from 'react';
import colors from '@/constants/colors';

export type SelectOptionType = {
  option: string;
  value: string;
};

export interface SelectInputProps {
  options: SelectOptionType[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInput({ options, value, onChange }: Readonly<SelectInputProps>) {
  return (
    <select
      className={`rounded-[8px] px-[10px] py-[10px] text-black text-[14px] outline-1`}
      style={{ backgroundColor: colors.C07, outlineColor: colors.C06 }}
      value={value}
      onChange={onChange}
    >
      {options.map(({ option, value }, index) => (
        <option key={index} value={value}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
