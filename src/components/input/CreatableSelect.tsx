// components/input/CreatableSelect.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import LabelInput from '@/components/label/LabelInput';
import colors from '@/constants/colors';
import { SelectOptionType } from './SelectInput';

interface CreatableSelectProps {
  label: string;
  options: SelectOptionType[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: string } }) => void;
  disabled?: boolean;
  placeholder?: string;
  onCreateOption?: (value: string) => void;
  onBlur?: () => void; // Add onBlur support
}

function CreatableSelect({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = 'Pilih atau ketik manual',
  onCreateOption,
  onBlur, // Add onBlur prop
}: Readonly<CreatableSelectProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomOption, setShowCustomOption] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync searchTerm with external value when not open
  useEffect(() => {
    if (!isOpen) {
      const selectedOption = options.find((opt) => opt.value === value);
      setSearchTerm(selectedOption?.option || value || '');
    }
  }, [value, isOpen, options]);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if we should show custom option
  useEffect(() => {
    setShowCustomOption(
      !!searchTerm &&
        !options.some((option) => option.option.toLowerCase() === searchTerm.toLowerCase()) &&
        !!onCreateOption
    );
  }, [searchTerm, options, onCreateOption]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.(); // Call onBlur when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onBlur]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);

    // Immediately update the parent form for manual typing
    if (onChange) {
      onChange({ target: { value: newValue } } as any);
    }
  };

  const handleSelectOption = (selectedValue: string) => {
    if (onChange) {
      onChange({ target: { value: selectedValue } } as any);
    }
    setIsOpen(false);
  };

  const handleCreateOption = () => {
    if (onCreateOption && searchTerm.trim()) {
      onCreateOption(searchTerm.trim());
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    // Keep the current value when focusing
    setSearchTerm(value ? options.find((opt) => opt.value === value)?.option || value : '');
  };

  const handleInputBlur = () => {
    onBlur?.(); // Call onBlur when input loses focus
  };

  const displayValue = isOpen
    ? searchTerm
    : options.find((opt) => opt.value === value)?.option || value || '';

  return (
    <div className="flex flex-col gap-[10px] relative" ref={dropdownRef}>
      <LabelInput label={label} />

      <div className="relative">
        {/* Input field for search and manual entry */}
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur} // Add onBlur handler
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full rounded-[8px] px-[10px] py-[10px] text-black text-[14px] outline-1 ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'
          }`}
          style={{ backgroundColor: colors.C07, outlineColor: colors.C06 }}
        />

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div
            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[8px] mt-1 shadow-lg z-10 max-h-60 overflow-y-auto"
            style={{ backgroundColor: colors.C07 }}
          >
            {/* Filtered options */}
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-[14px]"
                onClick={() => handleSelectOption(option.value)}
              >
                {option.option}
              </div>
            ))}

            {/* Custom create option */}
            {showCustomOption && (
              <div
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 cursor-pointer border-t border-gray-200 text-black text-[14px]"
                onClick={handleCreateOption}
              >
                + Tambah &#34;{searchTerm}&#34;
              </div>
            )}

            {/* No results message */}
            {filteredOptions.length === 0 && !showCustomOption && (
              <div className="px-4 py-2 text-gray-500 text-[14px]">Tidak ada hasil</div>
            )}
          </div>
        )}
      </div>

      {/* Hidden select for form compatibility */}
      <select value={value} onChange={onChange} className="hidden" disabled={disabled}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CreatableSelect;
