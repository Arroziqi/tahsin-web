// components/input/CreatableSelect.tsx
'use client';

import React from 'react';
import SearchableSelect from './SearchableSelect';
import { SelectOptionType } from './SelectInput';

interface CreatableSelectProps {
  label: string;
  options: SelectOptionType[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement> | { target: { value: string } }) => void;
  disabled?: boolean;
  placeholder?: string;
  onCreateOption?: (value: string) => void;
  onBlur?: () => void;
  createOptionMessage?: (value: string) => string;
}

function CreatableSelect({
  label,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = 'Pilih atau ketik manual',
  onCreateOption,
  onBlur,
  createOptionMessage = (value) => `+ Tambah "${value}"`,
}: Readonly<CreatableSelectProps>) {
  // Filter options based on search term
  const getFilteredOptions = (searchTerm: string) => {
    return options.filter((option) =>
      option.option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Check if we should show custom option
  const shouldShowCustomOption = (searchTerm: string) => {
    return (
      !!searchTerm &&
      !options.some((option) => option.option.toLowerCase() === searchTerm.toLowerCase()) &&
      !!onCreateOption
    );
  };

  // Custom render function for dropdown options
  const renderDropdownOptions = (
    searchTerm: string,
    handleSelectOption: (value: string) => void
  ) => {
    const filteredOptions = getFilteredOptions(searchTerm);
    const showCustom = shouldShowCustomOption(searchTerm);

    return (
      <>
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
        {showCustom && (
          <div
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 cursor-pointer border-t border-gray-200 text-black text-[14px]"
            onClick={() => onCreateOption && onCreateOption(searchTerm.trim())}
          >
            {createOptionMessage(searchTerm)}
          </div>
        )}

        {/* No results message */}
        {filteredOptions.length === 0 && !showCustom && (
          <div className="px-4 py-2 text-gray-500 text-[14px]">Tidak ada hasil</div>
        )}
      </>
    );
  };

  return (
    <SearchableSelect
      label={label}
      options={options}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={onBlur}
      noResultsMessage="Tidak ada hasil"
      // Additional props or custom rendering can be added here
    />
  );
}

// Extended version with custom dropdown rendering
// Note: This would require modifying SearchableSelect to accept a custom render prop
// For a simpler solution, we can create a separate component

export default CreatableSelect;
