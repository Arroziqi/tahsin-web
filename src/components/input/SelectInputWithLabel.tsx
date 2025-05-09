import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import SelectInput, { SelectOptionType } from '@/components/input/SelectInput';

interface SelectInputWithLabelProps {
  label: string;
  options: SelectOptionType[];
}

function SelectInputWithLabel({ label, options }: Readonly<SelectInputWithLabelProps>) {
  return (
    <div className={`flex flex-col gap-[10px]`}>
      <LabelInput label={label} />
      <SelectInput options={options} />
    </div>
  );
}

export default SelectInputWithLabel;
