'use client';

import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { updateAcademicPeriod } from '@/lib/academicPeriod/updateAcademicPeriod';
import { handleApiError } from '@/lib/utils/errorHandler';
import { AcademicPeriodResponse } from '@/common/type/academicPeriod/academicPeriodModel';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import TextAreaWithLabel from '@/components/input/TextAreaWithLabel';

interface EditAcademicPeriodModalProps {
  initialData: AcademicPeriodResponse;
  onClose?: () => void;
  refreshAcademicPeriods?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditAcademicPeriodModal({
  initialData,
  onClose,
  refreshAcademicPeriods,
  onSuccess,
}: EditAcademicPeriodModalProps) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(initialData.name);
  const [startDate, setStartDate] = useState<Date | null>(new Date(initialData.startDate));
  const [endDate, setEndDate] = useState<Date | null>(new Date(initialData.endDate));
  const [description, setDescription] = useState(initialData.description || '');
  const [isActive, setIsActive] = useState(initialData.isActive);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialData.name);
    setStartDate(new Date(initialData.startDate));
    setEndDate(new Date(initialData.endDate));
    setDescription(initialData.description || '');
    setIsActive(initialData.isActive);
  }, [initialData]);

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
      const response = await updateAcademicPeriod({
        id: initialData.id,
        name,
        startDate,
        endDate,
        description,
        isActive,
      });

      if (response) {
        refreshAcademicPeriods?.();
        onSuccess?.({
          title: 'Periode Akademik Berhasil Diperbarui',
          description: `Periode ${name} berhasil diperbarui`,
        });
        setOpen(false);
        onClose?.();
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithForm
      isOpen={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      onSubmit={handleSubmit}
      title="Edit Periode Akademik"
    >
      <TextInputWithLabel
        type="text"
        id="editPeriodName"
        label="Nama Periode*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama periode akademik"
      />

      <div className="grid grid-cols-2 gap-4">
        <DatePickerWithLabel
          id="editStartDate"
          label="Tanggal Mulai*"
          selectedDate={startDate!}
          onChange={(date) => setStartDate(date)}
        />
        <DatePickerWithLabel
          id="editEndDate"
          label="Tanggal Berakhir*"
          selectedDate={endDate!}
          onChange={(date) => setEndDate(date)}
          minDate={startDate || new Date()}
        />
      </div>

      <TextAreaWithLabel
        id="editDescription"
        label="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deskripsi tambahan"
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
  );
}

export default EditAcademicPeriodModal;
