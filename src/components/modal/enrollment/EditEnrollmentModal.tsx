'use client';

import React, { BaseSyntheticEvent, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { handleApiError } from '@/lib/utils/errorHandler';
import {
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from '@/common/type/enrollment/enrollmentModel';
import { ClassType, Education, Program } from '@/common/type/enrollment/enrollmentEnum';
import { updateEnrollment } from '@/lib/enrollment/updateEnrollment';
import { useSchedules } from '@/hooks/fetchData/useSchedules';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextInputWithLabelRHF from '@/components/input/TextInputWithLableRHF';
import TextAreaWithLabelRHF from '@/components/input/TextAreaWithLabelRHF';
import { DateHandler } from '@/common/helper/dateHandler';

interface EditEnrollmentModalProps {
  initialData: EnrollmentResponse;
  onClose?: () => void;
  refreshEnrollments?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditEnrollmentModal({
  initialData,
  onClose,
  refreshEnrollments,
  onSuccess,
}: EditEnrollmentModalProps) {
  const [open, setOpen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: timeOfStudies,
    error: timeOfStudyError,
    setError: setTimeOfStudyError,
    refetch: refreshTimeOfStudy,
  } = useSchedules();

  const timeOfStudiesToOptions = (studies: any[], placeholder: string) => [
    { value: '', option: placeholder },
    ...studies.map((s) => ({
      value: s.id.toString(),
      option: `${s.flattenedDay} - ${s.flattenedSession} (${s.Time.startTime}–${s.Time.endTime})`,
    })),
  ];

  const enumToOptions = (e: any, placeholder: string) =>
    [{ value: '', option: placeholder }].concat(
      Object.keys(e)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
          value: key,
          option: key,
        }))
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
    watch,
    setValue,
  } = useForm<UpdateEnrollmentRequest>({
    mode: 'onChange',
    defaultValues: {
      ...initialData,
      dateOfBirth: DateHandler.formatDateForInput(initialData.dateOfBirth),
      dateOfReservation: DateHandler.formatDateForInput(initialData.dateOfReservation),
    },
  });

  const onSubmit: SubmitHandler<UpdateEnrollmentRequest> = async (
    payload,
    e?: BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const response = await updateEnrollment(payload);

      if (response) {
        refreshEnrollments?.();
        onSuccess?.({
          title: 'Pendaftaran Berhasil Diperbarui',
          description: 'Data pendaftaran berhasil diperbarui',
        });
        reset();
        setOpen(false);
        onClose?.();
      }
    } catch (err) {
      const handled = handleApiError(err);
      console.log(err);
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
      onSubmit={undefined as any}
      formId="edit-enrollment-form"
      title="Edit Pendaftaran"
    >
      <form id="edit-enrollment-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <TextInputWithLabelRHF
          label={'Nama Lengkap'}
          id={'fullName'}
          type={'text'}
          registration={register('fullName', { required: 'Nama lengkap wajib diisi' })}
          error={errors.fullName?.message}
        />

        <TextInputWithLabelRHF
          label={'Email'}
          id={'email'}
          type={'email'}
          registration={register('email', {
            required: 'Email wajib diisi',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Format email tidak valid',
            },
          })}
          error={errors.email?.message}
        />

        <TextInputWithLabelRHF
          label={'No Telp'}
          id={'noTelp'}
          type={'text'}
          registration={register('noTelp', { required: 'Nomor telepon wajib diisi' })}
          error={errors.noTelp?.message}
        />

        <TextInputWithLabelRHF
          label={'Date of Birth'}
          id={'dateOfBirth'}
          type={'date'}
          registration={register('dateOfBirth', {
            required: 'Tanggal lahir wajib diisi',
          })}
          error={errors.dateOfBirth?.message}
        />

        <SelectInputWithLabel
          label={'Pendidikan Terakhir'}
          options={enumToOptions(Education, 'Pilih pendidikan terakhir')}
          value={watch('lastEducation') || ''}
          onChange={(e) => setValue('lastEducation', e.target.value as Education)}
        />

        <SelectInputWithLabel
          label={'Program'}
          options={enumToOptions(Program, 'Pilih program')}
          value={watch('program') || ''}
          onChange={(e) => setValue('program', e.target.value as Program)} // Extract value
        />

        <SelectInputWithLabel
          label={'Jenis Kelas'}
          options={enumToOptions(ClassType, 'Pilih jenis kelas')}
          value={watch('classType') || ''}
          onChange={(e) => setValue('classType', e.target.value as ClassType)} // Extract value
        />

        <SelectInputWithLabel
          label="Waktu belajar"
          options={timeOfStudiesToOptions(timeOfStudies, 'Pilih waktu belajar')}
          value={watch('timeOfStudyId')?.toString() || ''}
          onChange={(e) => setValue('timeOfStudyId', Number(e.target.value))}
        />

        <TextAreaWithLabelRHF
          label="Motivasi"
          placeholder="Tulis motivasi kamu…"
          registration={register('motivation', { required: 'Motivasi wajib diisi' })}
          error={errors.motivation?.message}
          rows={4}
        />

        <TextInputWithLabelRHF
          label={'Tanggal Ujian (Reservasi)'}
          id={'dateOfReservation'}
          type={'date'}
          registration={register('dateOfReservation')}
          error={errors.dateOfReservation?.message}
        />

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </form>
    </ModalWithForm>
  );
}

export default EditEnrollmentModal;
