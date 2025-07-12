import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import SelectInput, { SelectOptionType } from '@/components/input/SelectInput';

interface SelectInputWithLabelProps {
  label: string;
  options: SelectOptionType[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

function SelectInputWithLabel({
  label,
  options,
  value,
  onChange,
}: Readonly<SelectInputWithLabelProps>) {
  return (
    <div className="flex flex-col gap-[10px]">
      <LabelInput label={label} />
      <SelectInput options={options} value={value} onChange={onChange} />
    </div>
  );
}

export default SelectInputWithLabel;
