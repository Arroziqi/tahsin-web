import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addDay } from '@/lib/day/addDay';

interface AddDayFormModalProps {
  refreshDays?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

function AddDayFormModal({ refreshDays, onSuccess }: AddDayFormModalProps) {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setDay('');
    setStatus('active');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!day) {
      setError('Hari wajib dipilih');
      resetForm();
    }

    try {
      setLoading(true);
      const isActive = status === 'active';
      const success = await addDay({ day, isActive });

      if (success) {
        refreshDays?.();
        onSuccess?.({
          title: `Hari Berhasil Ditambahkan`,
          description: `Hari ${day} berhasil ditambahkan di sistem`,
        });
        setOpen(false);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error adding day:', err);

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
        Tambah Hari
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Hari"
      >
        <SelectInputWithLabel
          label="Hari*"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          options={hariOptions.map((h) => ({ option: h, value: h }))}
        />

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

export default AddDayFormModal;
