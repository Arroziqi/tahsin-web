// components/input/DatePickerWithLabelRHF.tsx
'use client';

import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import DatePickerWithLabel, {
  DatePickerWithLabelProps,
} from '@/components/input/DatePickerWithLabel';

export interface DatePickerWithLabelRHFProps<T extends FieldValues>
  extends Omit<DatePickerWithLabelProps, 'onChange' | 'selectedDate' | 'error'> {
  name: Path<T>;
  control: Control<T, any>; // 👈 tambahkan , any
  rules?: Parameters<typeof Controller<T>>[0]['rules'];
  error?: string;
}

function DatePickerWithLabelRHF<T extends FieldValues>({
  name,
  control,
  rules,
  error,
  ...props
}: Readonly<DatePickerWithLabelRHFProps<T>>) {
  return (
    <Controller<T> // 👈 pasangkan generic di sini
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <DatePickerWithLabel
          {...props}
          id={props.id ?? name}
          selectedDate={field.value}
          onChange={field.onChange}
          error={error}
        />
      )}
    />
  );
}

export default DatePickerWithLabelRHF;
