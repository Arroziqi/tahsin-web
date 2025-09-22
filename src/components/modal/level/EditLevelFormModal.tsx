import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { updateLevel } from '@/lib/level/updateLevel';
import { LevelResponseDataType } from '@/hooks/fetchData/level/useLevels';
import { handleApiError } from '@/lib/utils/errorHandler';

interface EditLevelFormModalProps {
  initialData: LevelResponseDataType;
  onClose?: () => void;
  refreshLevels?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditLevelFormModal({
  initialData,
  onClose,
  refreshLevels,
  onSuccess,
}: EditLevelFormModalProps) {
  const [open, setOpen] = useState(true);
  const [level, setLevel] = useState(initialData.level);
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialData.isActive === 'Aktif' ? 'active' : 'inactive'
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLevel(initialData.level);
    setStatus(initialData.isActive === 'Aktif' ? 'active' : 'inactive');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const isActive = status === 'active';
      const success = await updateLevel({ id: initialData.id, level, isActive });

      if (success) {
        refreshLevels?.();
        onSuccess?.({
          title: `Level Berhasil Diperbarui`,
          description: `Level ${level} berhasil diperbarui di sistem`,
        });
        setOpen(false);
        onClose?.();
      }
    } catch (error) {
      const handledError = handleApiError(error);
      setError(handledError.message);
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
      title="Edit Level"
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
  );
}

export default EditLevelFormModal;
