// components/input/StudentSelect.tsx
'use client';

import React, { useMemo } from 'react';
import SearchableSelect from '@/components/input/SearchableSelect';
import { SelectOptionType } from '@/components/input/SelectInput';
import useStudents from '@/hooks/fetchData/useStudents';
import { StudentResponse } from '@/common/type/student/studentModel';

interface StudentSelectProps {
  value?: string;
  onChange: (studentId: string, studentData?: StudentResponse) => void;
  disabled?: boolean;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
}

function StudentSelect({
  value,
  onChange,
  disabled = false,
  onBlur,
  label = 'Pilih Siswa',
  placeholder = 'Cari siswa...',
}: Readonly<StudentSelectProps>) {
  const { data: students, loading, error } = useStudents();

  // Process student data into options
  const studentOptions = useMemo(() => {
    const options: SelectOptionType[] = [{ value: '', option: 'Pilih siswa' }];

    students?.forEach((student: StudentResponse) => {
      options.push({
        value: student.id.toString(), // Gunakan student.id bukan student.userId
        option: `${student.fullName || 'No Name'} (ID: ${student.id})`,
      });
    });

    return options;
  }, [students]);

  const handleChange = (selectedValue: string) => {
    if (selectedValue) {
      const selectedStudent = students?.find((s) => s.id.toString() === selectedValue);
      onChange(selectedValue, selectedStudent);
    } else {
      onChange('');
    }
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <SearchableSelect
        label={label}
        options={studentOptions}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled || loading}
        placeholder={
          loading ? 'Memuat data siswa...' : error ? 'Error memuat data siswa' : placeholder
        }
        onBlur={onBlur}
        noResultsMessage="Tidak ada siswa ditemukan"
      />

      {error && <div className="text-red-500 text-sm mt-1">Error: {error}</div>}
    </div>
  );
}

export default StudentSelect;
