import React from 'react';
import LabelInput from '@/components/label/LabelInput';
import TextInput from '@/components/input/TextInput';

export interface TextInputWithLabelProps {
  label: string;
  id: string;
  type: HTMLInputElement['type'];
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  validate?: (value: string) => string | null;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>; // Added ref prop
  min?: number;
  max?: number;
  required?: boolean;
}

// Use forwardRef to support ref forwarding
const TextInputWithLabel = React.forwardRef<HTMLInputElement, TextInputWithLabelProps>(
  function TextInputWithLabel(
    {
      label,
      id,
      type,
      placeholder,
      labelClassName,
      inputClassName,
      onChange,
      onBlur,
      value,
      name,
      validate,
      disabled = false,
      min,
      max,
      required = false,
    },
    ref
  ) {
    return (
      <div className={`flex flex-col gap-[10px]`}>
        <LabelInput className={labelClassName} label={label} id={id} />
        <TextInput
          disabled={disabled}
          placeholder={placeholder}
          className={inputClassName}
          type={type}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          validate={validate}
          ref={ref} // Pass ref to TextInput
          min={min}
          max={max}
          required={required}
        />
      </div>
    );
  }
);

export default TextInputWithLabel;
