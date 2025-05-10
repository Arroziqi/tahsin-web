import React from 'react';
import colors from '@/constants/colors';

export type SelectOptionType = {
  option: string;
  value: string;
};

export interface SelectInputProps {
  options: SelectOptionType[];
}

function SelectInput({ options }: Readonly<SelectInputProps>) {
  return (
    <select
      className={`rounded-[8px] px-[10px] py-[10px] text-black text-[14px]`}
      style={{ backgroundColor: colors.C07 }}
    >
      {options.map(({ option, value }, index) => (
        <option key={index + 1} value={value}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
