import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { updateEvent } from '@/lib/event/updateEvent';
import { EventResponse } from '@/common/type/event/eventModel';

interface EditEventModalProps {
  initialData: EventResponse;
  onClose?: () => void;
  refreshEvents?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditEventModal({ initialData, onClose, refreshEvents, onSuccess }: EditEventModalProps) {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState(initialData.name);
  const [isActive, setIsActive] = useState(initialData.isActive);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(initialData.name);
    setIsActive(initialData.isActive);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name) {
      setError('Nama event wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const response = await updateEvent({
        id: initialData.id,
        name,
        isActive,
      });

      if (response) {
        refreshEvents?.();
        onSuccess?.({
          title: 'Event Berhasil Diperbarui',
          description: `Event ${name} berhasil diperbarui`,
        });
        setOpen(false);
        onClose?.();
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
    <ModalWithForm
      isOpen={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      onSubmit={handleSubmit}
      title="Edit Event"
    >
      <TextInputWithLabel
        type="text"
        id="editEventName"
        label="Nama Event*"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nama event"
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

export default EditEventModal;
