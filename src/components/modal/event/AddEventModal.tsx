import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addEvent } from '@/lib/event/addEvent';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';

interface AddEventModalProps {
  refreshEvents?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddEventModal({ refreshEvents, onSuccess }: AddEventModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setIsActive(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError('Nama event wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const response = await addEvent({
        name,
        isActive,
      });

      if (response) {
        refreshEvents?.();
        onSuccess?.({
          title: 'Event Berhasil Ditambahkan',
          description: `Event ${name} berhasil ditambahkan ke sistem`,
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
        Tambah Event
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Event"
      >
        <TextInputWithLabel
          type="text"
          id="eventName"
          label="Nama Event*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: UTS Semester Ganjil"
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

export default AddEventModal;
