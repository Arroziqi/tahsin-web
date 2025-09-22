'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabelRHF from '@/components/input/TextInputWithLableRHF';
import DatePickerWithLabelRHF from '@/components/input/DatePickerWithLabelRHF';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import {
  ClassScheduleResponse,
  ClassScheduleStatus,
  UpdateClassScheduleRequest,
} from '@/common/type/classSchedule/classScheduleModel';
import { SelectOptionType } from '@/components/input/SelectInput';
import { useTeachers } from '@/hooks/fetchData/useTeachers';
import useAssignedInPreferredSchedule from '@/hooks/fetchData/schedule/useAssignedInPreferredSchedule';
import useAssignedLevels from '@/hooks/fetchData/level/useAssignedLevels';
import { SelectOptions } from '@/common/helper/selectOptions';
import SearchableSelect from '@/components/input/SearchableSelect';
import { updateClassSchedule } from '@/lib/classSchedule/updateClassSchedule';
import { handleApiError } from '@/lib/utils/errorHandler';
import ConfirmationFailedModal from '@/components/modal/ConfirmationFailedModal';

interface EditClassScheduleModalProps {
  initialData: ClassScheduleResponse;
  onClose?: () => void;
  refreshClassSchedules?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditClassScheduleModal({
  initialData,
  onClose,
  refreshClassSchedules,
  onSuccess,
}: EditClassScheduleModalProps) {
  const [open, setOpen] = useState(true);

  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const { data: teachers } = useTeachers();
  const { data: schedules } = useAssignedInPreferredSchedule();
  const { data: levels } = useAssignedLevels();

  const levelOptions: SelectOptionType[] = SelectOptions.fromCollection(
    levels,
    'Pilih level',
    (s) => s.id,
    (s) => s.level
  );

  const scheduleOptions: SelectOptionType[] = SelectOptions.fromCollection(
    schedules,
    'Pilih jadwal',
    (s) => s.id,
    (s) => `${s.flattenedDay} - ${s.flattenedSession} (${s.Time!.startTime}–${s.Time!.endTime})`
  );

  const teacherOptions: SelectOptionType[] = SelectOptions.fromCollection(
    teachers,
    'Pilih teacher',
    (s) => s.id,
    (s) => s.name
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateClassScheduleRequest>({
    defaultValues: {
      id: initialData.id,
      name: initialData.name,
      levelId: initialData.levelId,
      scheduleId: initialData.scheduleId,
      teacherId: initialData.teacherId,
      startDate: initialData.startDate ? new Date(initialData.startDate) : undefined,
      endDate: initialData.endDate ? new Date(initialData.endDate) : undefined,
      capacity: initialData.capacity ?? undefined,
      isActive: initialData.isActive,
      status: initialData.status,
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const statusOptions: SelectOptionType[] = [
    { option: 'Pilih Status', value: '' },
    ...Object.values(ClassScheduleStatus).map((s) => ({ option: s, value: s })),
  ];

  const isActiveOptions: SelectOptionType[] = [
    { value: 'true', option: 'Aktif' },
    { value: 'false', option: 'Tidak Aktif' },
  ];

  const onSubmit = async (values: UpdateClassScheduleRequest) => {
    try {
      setSubmitting(true);
      await updateClassSchedule(values);
      refreshClassSchedules?.();
      onSuccess?.({
        title: 'Berhasil',
        description: 'Data jadwal kelas sudah disimpan.',
      });
      setOpen(false);
      onClose?.();
    } catch (err: any) {
      const handled = handleApiError(err);
      setErrorModal({
        open: true,
        message: handled?.message ?? 'Terjadi kesalahan saat memperbarui jadwal',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ModalWithForm
        isOpen={open}
        title="Edit Jadwal Kelas"
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        onSubmit={handleSubmit(onSubmit)}
        submitting={submitting}
      >
        <div className="space-y-4 mt-4">
          <TextInputWithLabelRHF
            registration={register('name', { required: 'Nama kelas wajib diisi' })}
            label="Nama Kelas"
            id="name"
            type="text"
            error={errors.name?.message}
          />

          <SelectInputWithLabel
            label="Level"
            options={levelOptions}
            value={watch('levelId')?.toString() ?? ''}
            onChange={(e) => setValue('levelId', Number(e.target.value))}
          />

          <SelectInputWithLabel
            label="Jadwal"
            options={scheduleOptions}
            value={watch('scheduleId')?.toString() ?? ''}
            onChange={(e) => setValue('scheduleId', Number(e.target.value))}
          />

          <SearchableSelect
            label="Ustadz / Ustadzah"
            options={teacherOptions}
            value={watch('teacherId')?.toString() ?? ''}
            onChange={(e) => {
              const val = Number(e.target.value);
              setValue('teacherId', isNaN(val) ? 0 : val);
            }}
            placeholder="Cari ustadz/ustadzah..."
          />

          <div className="flex justify-between gap-5">
            <DatePickerWithLabelRHF<UpdateClassScheduleRequest>
              control={control}
              name="startDate"
              id="startDate"
              label="Tanggal Mulai"
            />
            <DatePickerWithLabelRHF<UpdateClassScheduleRequest>
              control={control}
              name="endDate"
              id="endDate"
              label="Tanggal Selesai"
            />
          </div>

          <TextInputWithLabelRHF
            registration={register('capacity', { valueAsNumber: true })}
            label="Kapasitas"
            id="capacity"
            type="number"
          />

          <SelectInputWithLabel
            label="Status Jadwal"
            options={statusOptions}
            value={watch('status') ?? ''}
            onChange={(e) => setValue('status', e.target.value as ClassScheduleStatus)}
          />

          <SelectInputWithLabel
            label="Aktif?"
            options={isActiveOptions}
            value={watch('isActive') ? 'true' : 'false'}
            onChange={(e) => setValue('isActive', e.target.value === 'true')}
          />
        </div>
      </ModalWithForm>

      {errorModal.open && (
        <ConfirmationFailedModal
          title="Gagal Memperbarui Jadwal"
          description={errorModal.message}
          isOpen={errorModal.open}
          onClose={() => setErrorModal({ open: false, message: '' })}
        />
      )}
    </>
  );
}

export default EditClassScheduleModal;
