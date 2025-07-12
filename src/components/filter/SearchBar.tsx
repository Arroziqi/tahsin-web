import React from 'react';
import colors from '@/constants/colors';
import { FiSearch } from 'react-icons/fi';

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder = 'Cari data' }: SearchBarProps) {
  return (
    <div
      className="rounded-[20px] py-[7px] px-4 flex gap-2 items-center"
      style={{ backgroundColor: colors['bg-disabled'] }}
    >
      <input
        placeholder={placeholder}
        className="text-black outline-none bg-transparent"
        value={value}
        onChange={onChange}
      />
      <FiSearch size={20} color={'black'} />
    </div>
  );
}

export default SearchBar;
