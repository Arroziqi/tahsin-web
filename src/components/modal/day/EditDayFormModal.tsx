import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { DayResponseDataType } from '@/hooks/fetchData/useDays';
import { updateDay } from '@/lib/day/updateDay';

interface EditDayFormModalProps {
  initialData: DayResponseDataType & { status?: string };
  onClose?: () => void;
  refreshDays?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

function EditDayFormModal({ initialData, onClose, refreshDays, onSuccess }: EditDayFormModalProps) {
  const [open, setOpen] = useState(true);
  const [day, setDay] = useState(initialData.day || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialData.status === 'Aktif' ? 'active' : 'inactive'
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDay(initialData.day);
    setStatus(initialData.status === 'Aktif' ? 'active' : 'inactive');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const isActive = status === 'active';

      const success = await updateDay({
        id: initialData.id,
        day,
        isActive,
      });

      if (success) {
        refreshDays?.();
        onSuccess?.({
          title: `Hari Berhasil Diperbarui`,
          description: `Hari ${day} berhasil diperbarui di sistem`,
        });
        setOpen(false);
        onClose?.();
      }
    } catch (error) {
      const handled = handleApiError(error);
      setError(handled.message);
      console.error(getErrorMessage(handled));
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
      title="Edit Hari"
    >
      <SelectInputWithLabel
        label="Hari"
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
  );
}

export default EditDayFormModal;
