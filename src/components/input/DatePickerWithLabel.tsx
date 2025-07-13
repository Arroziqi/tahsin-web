'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import colors from '@/constants/colors';

interface DatePickerWithLabelProps {
  id: string;
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholderText?: string;
  className?: string;
  labelClassName?: string;
  datePickerClassName?: string;
  error?: string;
  showTimeSelect?: boolean;
  dateFormat?: string;
  validate?: (date: Date | null) => string | null;
}

const DatePickerWithLabel: React.FC<DatePickerWithLabelProps> = ({
  id,
  label,
  selectedDate,
  onChange,
  required = false,
  disabled = false,
  minDate = new Date(),
  maxDate,
  placeholderText = 'Pilih tanggal',
  className = '',
  labelClassName = '',
  datePickerClassName = '',
  error = '',
  showTimeSelect = false,
  dateFormat = 'dd/MM/yyyy',
  validate,
}) => {
  const [internalError, setInternalError] = React.useState<string | null>(null);

  const handleBlur = () => {
    if (validate) {
      const message = validate(selectedDate);
      setInternalError(message);
    }
  };

  const errorMessage = error || internalError;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm ${labelClassName} ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-[8px]" style={{ backgroundColor: colors.C07 }}>
        <DatePicker
          id={id}
          selected={selectedDate}
          onChange={onChange}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholderText}
          className={`w-full rounded-[8px] px-[10px] py-[7px] outline-none text-black ${
            errorMessage ? 'border border-red-500' : ''
          } ${datePickerClassName}`}
          dateFormat={dateFormat}
          showYearDropdown
          dropdownMode="select"
          showTimeSelect={showTimeSelect}
          onBlur={handleBlur}
          {...(showTimeSelect ? { timeFormat: 'HH:mm', timeIntervals: 15 } : {})}
          calendarClassName="font-sans" // Menyesuaikan font kalender
          popperClassName="z-50" // Memastikan date picker muncul di atas elemen lain
        />
      </div>
      {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
};

export default DatePickerWithLabel;
