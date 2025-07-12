import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addSchedule } from '@/lib/schedule/addSchedule';
import useDays from '@/hooks/fetchData/useDays';
import useTimes from '@/hooks/fetchData/useTimes';

interface AddScheduleFormModalProps {
  refreshSchedules?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddScheduleFormModal({ refreshSchedules, onSuccess }: AddScheduleFormModalProps) {
  const [open, setOpen] = useState(false);
  const [dayId, setDayId] = useState<number | null>(null);
  const [timeId, setTimeId] = useState<number | null>(null);
  const [classType, setClassType] = useState<'ONLINE' | 'OFFLINE'>('ONLINE');
  const [error, setError] = useState<string | null>(null);

  const { data: dayOptions } = useDays();
  const { data: timeOptions } = useTimes();

  const resetForm = () => {
    setDayId(null);
    setTimeId(null);
    setClassType('ONLINE');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!dayId || !timeId || !classType) {
      setError('Semua field wajib diisi');
      return;
    }

    try {
      const success = await addSchedule({
        dayId,
        timeId,
        classType,
      });

      if (success) {
        refreshSchedules?.();
        onSuccess?.({
          title: 'Jadwal Berhasil Ditambahkan',
          description: 'Jadwal berhasil ditambahkan ke sistem.',
        });
        setOpen(false);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error adding schedule:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).join('\n');
        setError(errorMessages);
      } else if (err.request) {
        setError('Tidak ada respon dari server');
      } else {
        setError(err.message || 'Terjadi kesalahan');
      }
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
        Tambah Jadwal
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Jadwal"
      >
        <SelectInputWithLabel
          label="Hari*"
          value={dayId?.toString() || ''}
          onChange={(e) => setDayId(Number(e.target.value))}
          options={dayOptions.map((d) => ({
            option: d.day,
            value: d.id.toString(),
          }))}
        />

        <SelectInputWithLabel
          label="Sesi*"
          value={timeId?.toString() || ''}
          onChange={(e) => setTimeId(Number(e.target.value))}
          options={timeOptions.map((t) => ({
            option: `${t.session} (${t.startTime} - ${t.endTime})`,
            value: t.id.toString(),
          }))}
        />

        <SelectInputWithLabel
          label="Tipe Kelas*"
          value={classType}
          onChange={(e) => setClassType(e.target.value as 'ONLINE' | 'OFFLINE')}
          options={[
            { option: 'Online', value: 'ONLINE' },
            { option: 'Offline', value: 'OFFLINE' },
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

export default AddScheduleFormModal;
