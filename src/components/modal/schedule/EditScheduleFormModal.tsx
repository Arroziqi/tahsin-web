import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { updateSchedule } from '@/lib/schedule/updateSchedule';
import { ScheduleResponseDataType } from '@/hooks/fetchData/useSchedules';
import useDays from '@/hooks/fetchData/useDays';
import useTimes from '@/hooks/fetchData/useTimes';

interface EditScheduleFormModalProps {
  initialData: ScheduleResponseDataType;
  onClose?: () => void;
  refreshSchedules?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditScheduleFormModal({
  initialData,
  onClose,
  refreshSchedules,
  onSuccess,
}: EditScheduleFormModalProps) {
  const [open, setOpen] = useState(true);
  const [dayId, setDayId] = useState(initialData.dayId.toString());
  const [timeId, setTimeId] = useState(initialData.timeId.toString());
  const [classType, setClassType] = useState<'ONLINE' | 'OFFLINE'>(initialData.classType);
  const [isActive, setIsActive] = useState(initialData.isActive ? 'Aktif' : 'Non Aktif');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: dayOptions, loading: loadingDays } = useDays();
  const { data: timeOptions, loading: loadingTimes } = useTimes();

  useEffect(() => {
    setDayId(initialData.dayId.toString());
    setTimeId(initialData.timeId.toString());
    setClassType(initialData.classType);
    setIsActive(initialData.isActive ? 'Aktif' : 'Non Aktif');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const success = await updateSchedule({
        id: initialData.id,
        dayId: Number(dayId),
        timeId: Number(timeId),
        classType,
        isActive: isActive === 'Aktif',
      });

      if (success) {
        refreshSchedules?.();
        onSuccess?.({
          title: `Jadwal Berhasil Diperbarui`,
          description: `Jadwal berhasil diperbarui di sistem.`,
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
      title="Edit Jadwal"
    >
      <SelectInputWithLabel
        label="Hari"
        value={dayId}
        onChange={(e) => setDayId(e.target.value)}
        options={dayOptions.map((d) => ({ option: d.day, value: d.id.toString() }))}
      />

      <SelectInputWithLabel
        label="Sesi"
        value={timeId}
        onChange={(e) => setTimeId(e.target.value)}
        options={timeOptions.map((t) => ({
          option: `${t.session} (${t.startTime} - ${t.endTime})`,
          value: t.id.toString(),
        }))}
      />

      <SelectInputWithLabel
        label="Tipe Kelas"
        value={classType}
        onChange={(e) => setClassType(e.target.value as 'ONLINE' | 'OFFLINE')}
        options={[
          { option: 'Online', value: 'ONLINE' },
          { option: 'Offline', value: 'OFFLINE' },
        ]}
      />

      <SelectInputWithLabel
        label="Status"
        value={isActive}
        onChange={(e) => setIsActive(e.target.value)}
        options={[
          { option: 'Aktif', value: 'Aktif' },
          { option: 'Non Aktif', value: 'Non Aktif' },
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

export default EditScheduleFormModal;
