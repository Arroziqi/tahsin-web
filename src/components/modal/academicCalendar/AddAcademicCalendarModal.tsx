'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { addAcademicCalendar } from '@/lib/academicCalendar/addAcademicCalendar';
import { handleApiError } from '@/lib/utils/errorHandler';
import { FaPlusCircle } from 'react-icons/fa';
import colors from '@/constants/colors';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import useAcademicPeriods from '@/hooks/fetchData/academicPeriod/useAcademicPeriods';
import useEvents from '@/hooks/fetchData/useEvents';

interface AddAcademicCalendarModalProps {
  refreshAcademicCalendars?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddAcademicCalendarModal({
  refreshAcademicCalendars,
  onSuccess,
}: AddAcademicCalendarModalProps) {
  const [open, setOpen] = useState(false);
  const [academicPeriodId, setAcademicPeriodId] = useState<string>(''); // Changed to string
  const [eventId, setEventId] = useState<string>(''); // Changed to string
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: periods } = useAcademicPeriods();
  const { data: events } = useEvents();

  const activePeriods = useMemo(() => {
    return (periods ?? []).filter((p) => p.isActive === true);
  }, [periods]);

  const selectedPeriod = useMemo(() => {
    return activePeriods.find((_) => _.id.toString() === academicPeriodId);
  }, [academicPeriodId, activePeriods]);

  useEffect(() => {
    if (selectedPeriod) {
      setStartDate(new Date(selectedPeriod.startDate));
      setEndDate(new Date(selectedPeriod.endDate));
    } else {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  }, [selectedPeriod]);

  const activeEvents = useMemo(() => {
    return (events ?? []).filter((e) => e.isActive);
  }, [events]);

  const resetForm = () => {
    setAcademicPeriodId('');
    setEventId('');
    setStartDate(undefined);
    setEndDate(undefined);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!academicPeriodId || !eventId || !startDate || !endDate) {
      setError('Semua field wajib diisi');
      return;
    }

    const periodId = Number(academicPeriodId);
    const evtId = Number(eventId);

    if (endDate <= startDate) {
      setError('Tanggal berakhir harus setelah tanggal mulai');
      return;
    }

    try {
      setLoading(true);
      const response = await addAcademicCalendar({
        academicPeriodId: periodId,
        eventId: evtId,
        startDate,
        endDate,
      });

      if (response) {
        refreshAcademicCalendars?.();
        onSuccess?.({
          title: 'Kalender Akademik Berhasil Ditambahkan',
          description: 'Event akademik berhasil ditambahkan ke sistem',
        });
        setOpen(false);
        resetForm();
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
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
        Tambah Kalender Akademik
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Kalender Akademik"
      >
        <SelectInputWithLabel
          label="Periode Akademik*"
          value={academicPeriodId}
          onChange={(e) => setAcademicPeriodId(e.target.value)}
          options={[
            { option: 'Pilih periode akademik', value: '' },
            ...activePeriods.map((period) => ({
              option: period.name,
              value: period.id.toString(),
            })),
          ]}
        />

        <SelectInputWithLabel
          label="Event Akademik*"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          options={[
            { option: 'Pilih event aktif yang tersedia', value: '' },
            ...activeEvents.map((event) => ({
              option: event.name,
              value: event.id.toString(),
            })),
          ]}
        />

        <div className="flex gap-3">
          <div className="w-full">
            <DatePickerWithLabel
              id="startDate"
              label="Tanggal Mulai Event"
              selectedDate={startDate}
              onChange={(date: Date | null) => setStartDate(date || undefined)}
              required
              minDate={selectedPeriod ? new Date(selectedPeriod.startDate) : undefined}
              maxDate={selectedPeriod ? new Date(selectedPeriod.endDate) : undefined}
            />
          </div>
          <div className="w-full">
            <DatePickerWithLabel
              id="endDate"
              label="Tanggal Berakhir Event"
              selectedDate={endDate}
              onChange={(date: Date | null) => setEndDate(date || undefined)}
              required
              minDate={
                startDate ?? (selectedPeriod ? new Date(selectedPeriod.startDate) : undefined)
              }
              maxDate={selectedPeriod ? new Date(selectedPeriod.endDate) : undefined}
            />
          </div>
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </ModalWithForm>
    </>
  );
}

export default AddAcademicCalendarModal;
