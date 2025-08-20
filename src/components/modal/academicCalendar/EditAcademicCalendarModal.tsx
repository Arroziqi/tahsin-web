'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { updateAcademicCalendar } from '@/lib/academicCalendar/updateAcademicCalendar';
import { handleApiError } from '@/lib/utils/errorHandler';
import { AcademicCalendarResponse } from '@/common/type/academicCalendar/academicCalendarModel';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import useAcademicPeriods from '@/hooks/fetchData/academicPeriod/useAcademicPeriods';
import useEvents from '@/hooks/fetchData/useEvents';

interface EditAcademicCalendarModalProps {
  initialData: AcademicCalendarResponse;
  onClose?: () => void;
  refreshAcademicCalendars?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditAcademicCalendarModal({
  initialData,
  onClose,
  refreshAcademicCalendars,
  onSuccess,
}: EditAcademicCalendarModalProps) {
  const [open, setOpen] = useState(true);
  const [academicPeriodId, setAcademicPeriodId] = useState(initialData.academicPeriodId);
  const [eventId, setEventId] = useState(initialData.eventId);
  const [startDate, setStartDate] = useState<Date | null>(new Date(initialData.startDate));
  const [endDate, setEndDate] = useState<Date | null>(new Date(initialData.endDate));
  const [isActive, setIsActive] = useState(initialData.isActive);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: periods } = useAcademicPeriods();
  const { data: events } = useEvents();

  const activePeriods = useMemo(() => {
    return (periods ?? []).filter((p) => p.isActive === true);
  }, [periods]);

  const selectedPeriod = useMemo(() => {
    return activePeriods.find((p) => p.id === academicPeriodId);
  }, [academicPeriodId, activePeriods]);

  useEffect(() => {
    if (selectedPeriod) {
      const newStart = new Date(selectedPeriod.startDate);
      const newEnd = new Date(selectedPeriod.endDate);

      if (!startDate || startDate < newStart || startDate > newEnd) {
        setStartDate(newStart);
      }
      if (!endDate || endDate < newStart || endDate > newEnd) {
        setEndDate(newEnd);
      }
    }
  }, [endDate, selectedPeriod, startDate]);

  const activeEvents = useMemo(() => {
    return (events ?? []).filter((e) => e.isActive);
  }, [events]);

  const statusOptions = [
    { option: 'Aktif', value: 'true' },
    { option: 'Tidak Aktif', value: 'false' },
  ];

  useEffect(() => {
    setAcademicPeriodId(initialData.academicPeriodId);
    setEventId(initialData.eventId);
    setStartDate(new Date(initialData.startDate));
    setEndDate(new Date(initialData.endDate));
    setIsActive(initialData.isActive);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!academicPeriodId || !eventId || !startDate || !endDate) {
      setError('Semua field wajib diisi');
      return;
    }

    if (endDate <= startDate) {
      setError('Tanggal berakhir harus setelah tanggal mulai');
      return;
    }

    try {
      setLoading(true);
      const response = await updateAcademicCalendar({
        id: initialData.id,
        academicPeriodId,
        eventId,
        startDate,
        endDate,
        isActive,
      });

      if (response) {
        refreshAcademicCalendars?.();
        onSuccess?.({
          title: 'Kalender Akademik Berhasil Diperbarui',
          description: 'Event akademik berhasil diperbarui',
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
      title="Edit Kalender Akademik"
    >
      <div className="space-y-4">
        <SelectInputWithLabel
          label="Status*"
          value={isActive.toString()}
          onChange={(e) => setIsActive(e.target.value === 'true')}
          options={statusOptions}
        />

        <SelectInputWithLabel
          label="Periode Akademik*"
          value={academicPeriodId.toString()}
          onChange={(e) => setAcademicPeriodId(Number(e.target.value))}
          options={activePeriods.map((period) => ({
            option: period.name,
            value: period.id.toString(),
          }))}
        />

        <SelectInputWithLabel
          label="Event Akademik*"
          value={eventId.toString()}
          onChange={(e) => setEventId(Number(e.target.value))}
          options={activeEvents.map((event) => ({
            option: event.name,
            value: event.id.toString(),
          }))}
        />

        <div className="flex gap-3">
          <DatePickerWithLabel
            id="editStartDate"
            label="Tanggal Mulai Event*"
            selectedDate={startDate ?? undefined}
            onChange={(date) => setStartDate(date)}
            minDate={selectedPeriod ? new Date(selectedPeriod.startDate) : undefined}
            maxDate={selectedPeriod ? new Date(selectedPeriod.endDate) : undefined}
          />
          <DatePickerWithLabel
            id="editEndDate"
            label="Tanggal Berakhir Event*"
            selectedDate={endDate ?? undefined}
            onChange={(date) => setEndDate(date)}
            minDate={startDate ?? (selectedPeriod ? new Date(selectedPeriod.startDate) : undefined)}
            maxDate={selectedPeriod ? new Date(selectedPeriod.endDate) : undefined}
          />
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

export default EditAcademicCalendarModal;
