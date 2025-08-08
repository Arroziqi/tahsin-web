import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { TimeResponseDataType } from '@/hooks/fetchData/useTimes';
import { handleApiError } from '@/lib/utils/errorHandler';
import { updateTime } from '@/lib/time/updateTime';

interface EditTimeFormModalProps {
  initialData: TimeResponseDataType;
  onClose?: () => void;
  refreshTimes?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditTimeFormModal({
  initialData,
  onClose,
  refreshTimes,
  onSuccess,
}: EditTimeFormModalProps) {
  const [open, setOpen] = useState(true);
  const [session, setSession] = useState(initialData.session || '');
  const [startTime, setStartTime] = useState(initialData.startTime || '');
  const [endTime, setEndTime] = useState(initialData.endTime || '');
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialData.status === 'Aktif' ? 'active' : 'inactive'
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSession(initialData.session);
    setStartTime(initialData.startTime);
    setEndTime(initialData.endTime);
    setStatus(initialData.status === 'Aktif' ? 'active' : 'inactive');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const isActive = status === 'active';

      const success = await updateTime({
        id: initialData.id,
        session,
        startTime,
        endTime,
        isActive,
      });

      if (success) {
        refreshTimes?.();
        onSuccess?.({
          title: `Sesi Waktu Berhasil Diperbarui`,
          description: `Sesi ${session} berhasil diperbarui di sistem`,
        });
        setOpen(false);
        onClose?.();
      }
    } catch (error) {
      const handled = handleApiError(error);
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
      title="Edit Sesi Waktu"
    >
      <TextInputWithLabel
        label="Nama Sesi"
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
  );
}

export default EditTimeFormModal;
