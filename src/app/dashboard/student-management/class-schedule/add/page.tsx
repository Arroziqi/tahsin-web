'use client';

import React, { useEffect, useState } from 'react';
import PrimaryButton from '@/components/button/PrimaryButton';
import ConfirmSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { handleApiError } from '@/lib/utils/errorHandler';
import { useForm } from 'react-hook-form';
import { StudentResponse } from '@/common/type/student/studentModel';
import { useTeachers } from '@/hooks/fetchData/useTeachers';
import useAssignedInPreferredSchedule from '@/hooks/fetchData/schedule/useAssignedInPreferredSchedule';
import useAssignedLevels from '@/hooks/fetchData/level/useAssignedLevels';
import { CreateClassScheduleRequest } from '@/common/type/classSchedule/classScheduleModel';
import { SelectOptionType } from '@/components/input/SelectInput';
import { SelectOptions } from '@/common/helper/selectOptions';
import { getByLevelAndPreferredSchedule } from '@/lib/student/getByLevelAndPreferredSchedule';
import { addClassSchedule } from '@/lib/classSchedule/addClassSchedule';
import TextInputWithLabelRHF from '@/components/input/TextInputWithLableRHF';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import DatePickerWithLabelRHF from '@/components/input/DatePickerWithLabelRHF';
import SearchableSelect from '@/components/input/SearchableSelect';
import ToastInfo from '@/components/alert/ToastInfo';
import ConfirmFailedModal from '@/components/modal/ConfirmationFailedModal';

// ======================= TODO LIST =======================
//
// - [ ] Teacher yang muncul di dropdown harus teacher yang
//       available pada jam/schedule tersebut
//       (jika di jam itu dia sudah di-assign ke kelas lain,
//       maka jangan ditampilkan).
//
// - [ ] Kapasitas harus menghitung hanya siswa yang benar-
//       benar prefer di jam tersebut DAN berada di level
//       yang dipilih.
//
// - [ ] Field `capacity` kadang jadi `NaN`. Periksa kembali
//       binding antara input & auto-isi students.length
//       supaya value kosong tidak berubah menjadi NaN.
//
// =========================================================

function AddClassSchedulePage() {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [capacityStatus, setCapacityStatus] = useState<{
    status: 'ok' | 'warning';
    remaining?: number;
  } | null>(null);

  const { data: teachers, loading: teachersLoading } = useTeachers();
  const { data: schedules } = useAssignedInPreferredSchedule();
  const { data: levels } = useAssignedLevels();
  const [submitting, setSubmitting] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClassScheduleRequest>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      levelId: undefined,
      scheduleId: undefined,
      startDate: new Date(),
      endDate: new Date(),
      teacherId: undefined,
      capacity: undefined,
    },
  });

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

  const today = new Date();
  const start = watch('startDate');
  const end = watch('endDate');
  const levelId = watch('levelId');
  const scheduleId = watch('scheduleId');
  const capacity = watch('capacity');
  const name = watch('name');
  const teacherId = watch('teacherId');

  // ==== Fetch students from API when level & schedule selected ====
  useEffect(() => {
    const fetchStudents = async () => {
      if (levelId && scheduleId) {
        const data = await getByLevelAndPreferredSchedule(levelId, scheduleId);
        setStudents(data);
      } else {
        setStudents([]);
      }
    };
    fetchStudents();
  }, [levelId, scheduleId]);

  // ==== Auto adjust endDate if < startDate ====
  useEffect(() => {
    if (start && (!end || end < start)) {
      setValue('endDate', start, { shouldValidate: true });
    }
  }, [start, end, setValue]);

  // ==== Auto-set capacity default ====
  useEffect(() => {
    if (students.length > 0 && (capacity === undefined || capacity === null)) {
      setValue('capacity', students.length, { shouldValidate: true });
    }
  }, [students, capacity, setValue]);

  // ==== Check capacity vs students ====
  useEffect(() => {
    if (!capacity || students.length === 0) {
      setCapacityStatus(null);
      return;
    }
    if (students.length > capacity) {
      setCapacityStatus({
        status: 'warning',
        remaining: students.length - capacity,
      });
    } else {
      setCapacityStatus({ status: 'ok' });
    }
  }, [capacity, students]);

  // ===== Handler submit =====
  const onSubmit = async (values: CreateClassScheduleRequest) => {
    try {
      setSubmitting(true);
      console.log('📌 Form submit:', values);
      console.log('📌 Students yang ikut kapasitas:', students);

      await addClassSchedule(values);
      setSuccessModalOpen(true); // ✅ tampilkan modal sukses
    } catch (err: any) {
      const handledError = handleApiError(err);
      console.log('err', err);
      console.log('handledError', handledError);
      setErrorModal({
        open: true,
        message: handledError?.message ?? 'Terjadi kesalahan saat menambahkan jadwal',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ===== Validasi untuk enable/disable tombol =====
  const isFormValid =
    !!name && !!levelId && !!scheduleId && !!teacherId && !!start && !!end && !!capacity;

  return (
    <>
      <div className="mx-auto flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <TextInputWithLabelRHF
            registration={register('name', { required: 'Nama kelas wajib diisi' })}
            label="Nama Kelas"
            id="name"
            type="text"
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
          <div className="flex justify-between gap-5 md:gap-10">
            <DatePickerWithLabelRHF<CreateClassScheduleRequest>
              id="startDate"
              control={control}
              name="startDate"
              label="Tanggal Mulai"
              minDate={today}
              maxDate={end && end > today ? end : undefined}
            />

            <DatePickerWithLabelRHF<CreateClassScheduleRequest>
              id="endDate"
              control={control}
              name="endDate"
              label="Tanggal Selesai"
              minDate={start ?? today}
            />
          </div>
          <SearchableSelect
            label="Ustadz / Ustadzah"
            options={teacherOptions}
            value={teacherId?.toString() ?? ''}
            onChange={(e) => {
              const val = Number(e.target.value);
              setValue('teacherId', isNaN(val) ? 0 : val);
            }}
            placeholder="Cari ustadz/ustadzah..."
          />
          <TextInputWithLabelRHF
            registration={register('capacity', {
              valueAsNumber: true,
              setValueAs: (v) =>
                v === '' || v === null || v === undefined ? undefined : Number(v),
            })}
            label="Kapasitas Kelas"
            id="capacity"
            type="number"
          />
          <PrimaryButton
            text={submitting ? 'Menyimpan…' : 'Tambah Jadwal'}
            disabled={!isFormValid || submitting}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>

      {/* Alert status kapasitas */}
      {capacityStatus && (
        <ToastInfo
          status={capacityStatus.status === 'warning' ? 'warning' : 'success'}
          message={
            capacityStatus.status === 'warning'
              ? `Kapasitas tidak cukup! Ada ${capacityStatus.remaining} siswa belum tertampung.`
              : 'Semua siswa tercakup dengan kapasitas ini 🎉'
          }
          subMessage={
            capacityStatus.status === 'warning'
              ? 'Tambah kapasitas atau buat jadwal kelas baru.'
              : undefined
          }
        />
      )}

      {/* === MODAL SUKSES === */}
      <ConfirmSuccessModal
        title="Jadwal berhasil ditambahkan!"
        description="Jadwal kelas baru sudah tersimpan di sistem."
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />

      {/* === MODAL ERROR === */}
      {errorModal.open && (
        <ConfirmFailedModal
          title="Gagal Menambahkan Jadwal"
          description={errorModal.message}
          isOpen={errorModal.open}
          onClose={() => setErrorModal({ open: false, message: '' })}
        />
      )}
    </>
  );
}

export default AddClassSchedulePage;
