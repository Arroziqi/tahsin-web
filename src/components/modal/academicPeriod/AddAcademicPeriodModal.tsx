'use client';

import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { addAcademicPeriod } from '@/lib/academicPeriod/addAcademicPeriod';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { FaPlusCircle } from 'react-icons/fa';
import colors from '@/constants/colors';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import TextAreaWithLabel from '@/components/input/TextAreaWithLabel';

interface AddAcademicPeriodModalProps {
  refreshAcademicPeriods?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddAcademicPeriodModal({
  refreshAcademicPeriods,
  onSuccess,
}: AddAcademicPeriodModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setStartDate(null);
    setEndDate(null);
    setDescription('');
    setIsActive(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !startDate || !endDate) {
      setError('Nama, tanggal mulai, dan tanggal berakhir wajib diisi');
      return;
    }

    if (endDate <= startDate) {
      setError('Tanggal berakhir harus setelah tanggal mulai');
      return;
    }

    try {
      setLoading(true);
      const response = await addAcademicPeriod({
        name,
        startDate,
        endDate,
        description,
        isActive,
      });

      if (response) {
        refreshAcademicPeriods?.();
        onSuccess?.({
          title: 'Periode Akademik Berhasil Ditambahkan',
          description: `Periode ${name} berhasil ditambahkan ke sistem`,
        });
        setOpen(false);
        resetForm();
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
      console.error(getErrorMessage(handled));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white px-3 py-2 rounded-lg flex items-center gap-2 w-fit font-medium cursor-pointer"
        style={{ backgroundColor: colors.C06 }}
      >
        <FaPlusCircle size={20} />
        Tambah Periode Akademik
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Periode Akademik"
      >
        <TextInputWithLabel
          type="text"
          id="periodName"
          label="Nama Periode*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: 2024/2025 Semester 1"
        />

        <div className="flex gap-3">
          <div className="w-full">
            <DatePickerWithLabel
              id="startDate"
              label="Tanggal Mulai*"
              selectedDate={startDate as Date | undefined}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
            />
          </div>
          <div className="w-full">
            <DatePickerWithLabel
              id="endDate"
              label="Tanggal Berakhir*"
              selectedDate={endDate as Date | undefined}
              onChange={(date) => setEndDate(date)}
              minDate={startDate || new Date()}
            />
          </div>
        </div>

        <TextAreaWithLabel
          id="description"
          label="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi tambahan (opsional)"
        />

        <SelectInputWithLabel
          label="Status"
          value={isActive ? 'active' : 'inactive'}
          onChange={(e) => setIsActive(e.target.value === 'active')}
          options={[
            { option: 'Aktif', value: 'active' },
            { option: 'Tidak Aktif', value: 'inactive' },
          ]}
        />

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </ModalWithForm>
    </>
  );
}

export default AddAcademicPeriodModal;
