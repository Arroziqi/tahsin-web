import React, { useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addLevel } from '@/lib/level/addLevel';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';

interface AddLevelFormModalProps {
  refreshLevels?: () => void;
}

function AddLevelFormModal({ refreshLevels }: AddLevelFormModalProps) {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const resetForm = () => {
    setLevel('');
    setStatus('active');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!level.trim()) {
      setError('Nama Level wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const isActive = status === 'active';
      const success = await addLevel({ level, isActive });

      if (success) {
        refreshLevels?.();
        setOpen(false);
        resetForm();
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      console.error('Error adding level:', err);

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
        Tambah Level
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Level"
      >
        <TextInputWithLabel
          label="Nama Level*"
          id="level"
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          placeholder="Contoh: Tahsin 3"
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

      <ConfirmationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Level Berhasil Ditambahkan"
        description={`Level ${level} berhasil ditambahkan ke sistem`}
      />
    </>
  );
}

export default AddLevelFormModal;
