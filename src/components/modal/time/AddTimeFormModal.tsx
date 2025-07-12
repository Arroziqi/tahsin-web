import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addTime } from '@/lib/time/addTime';

interface AddTimeFormModalProps {
  refreshTimes?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddTimeFormModal({ refreshTimes, onSuccess }: AddTimeFormModalProps) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setSession('');
    setStartTime('');
    setEndTime('');
    setStatus('active');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!session.trim()) {
      setError('Nama sesi wajib diisi');
      return;
    }

    if (!startTime || !endTime) {
      setError('Waktu mulai dan selesai wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const isActive = status === 'active';
      const success = await addTime({ session, startTime, endTime, isActive });

      if (success) {
        refreshTimes?.();
        onSuccess?.({
          title: `Sesi Waktu Berhasil Ditambahkan`,
          description: `Sesi ${session} berhasil ditambahkan di sistem`,
        });
        setOpen(false);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error adding time:', err);

      if (err.response) {
        if (err.response.data?.message) {
          setError(err.response.data.message);
        } else if (err.response.data?.errors) {
          const errorMessages = Object.values(err.response.data.errors).join('\n');
          setError(errorMessages);
        } else {
          setError('Terjadi kesalahan pada server');
        }
      } else if (err.request) {
        setError('Tidak ada respon dari server');
      } else {
        setError(err.message || 'Terjadi kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="text-white px-3 py-2 rounded-lg flex items-center gap-2 w-fit font-medium cursor-pointer"
        style={{ backgroundColor: colors.C06 }}
      >
        <FaPlusCircle size={20} />
        Tambah Sesi Waktu
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Sesi Waktu"
      >
        <TextInputWithLabel
          label="Nama Sesi*"
          id="session"
          type="text"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          placeholder="Contoh: Sesi Pagi"
        />

        <div className="grid grid-cols-2 gap-4">
          <TextInputWithLabel
            label="Waktu Mulai"
            id="startTime"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextInputWithLabel
            label="Waktu Selesai"
            id="endTime"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <p className="text-sm text-[#AB800A] mt-1">Durasi harus tepat 2 jam</p>

        <SelectInputWithLabel
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'inactive')}
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

export default AddTimeFormModal;
