import React from 'react';
import colors from '@/constants/colors';

export interface FilterStatusProps {
  status: string[];
  onChange?: (selectedIndex: number) => void;
  selectedStatus: number;
}

function FilterStatus({ status, onChange, selectedStatus }: Readonly<FilterStatusProps>) {
  return (
    <div
      className="rounded-lg flex justify-center items-center w-fit"
      style={{ backgroundColor: colors['bg-disabled'] }}
    >
      {status.map((item, index) => (
        <div
          key={item}
          className={`rounded-lg px-[16px] py-[5px] text-[12px] cursor-pointer font-medium ${
            selectedStatus === index ? 'text-white' : 'text-black'
          }`}
          style={{
            backgroundColor: selectedStatus === index ? colors.C06 : 'transparent',
          }}
          onClick={() => onChange?.(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default FilterStatus;
