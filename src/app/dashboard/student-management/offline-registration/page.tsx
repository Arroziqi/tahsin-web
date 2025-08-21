'use client';

import React, { useEffect, useState } from 'react';
import useStudents from '@/hooks/fetchData/useStudents';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import PrimaryButton from '@/components/button/PrimaryButton';

import { CreateEnrollmentRequest } from '@/common/type/enrollment/enrollmentModel';
import {
  ClassType,
  Education,
  Program,
  TimeOfStudy,
} from '@/common/type/enrollment/enrollmentEnum';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { handleApiError } from '@/lib/utils/errorHandler';
import { addEnrollment } from '@/lib/enrollment/addEnrollment';
import TextAreaWithLabel from '@/components/input/TextAreaWithLabel';
import { useForm } from 'react-hook-form';
import { getActiveAcademicPeriod } from '@/lib/academicPeriod/getActiveAcademicPeriod';
import TextInputWithLabelRHF from '@/components/input/TextInputWithLableRHF';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import UsernameCreatableSelect from '@/components/ui/UsernameCreatableSelect';

function OfflineRegistrationPage() {
  const {
    data: students,
    error: studentsError,
    setError: setStudentsError,
    refresh: refreshStudent,
  } = useStudents();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [activeAcademicPeriod, setActiveAcademicPeriod] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [academicPeriodLoading, setAcademicPeriodLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<CreateEnrollmentRequest>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      fullName: '',
      motivation: '',
      dateOfBirth: '',
      noTelp: '',
      lastEducation: undefined,
      program: undefined,
      classType: undefined,
      timeOfStudy: undefined,
      academicPeriodId: undefined,
    },
  });

  const selectedUserId = watch('userId');
  const [autoFilledFields, setAutoFilledFields] = useState<Set<string>>(new Set());

  const handleReset = () => {
    reset();
    setAutoFilledFields(new Set());
    refreshStudent();
  };

  // Fetch active academic period on component mount
  useEffect(() => {
    const fetchActiveAcademicPeriod = async () => {
      try {
        setAcademicPeriodLoading(true);
        const period = await getActiveAcademicPeriod();

        if (period) {
          setActiveAcademicPeriod({ id: period.id, name: period.name });
          setValue('academicPeriodId', period.id);
        }
      } catch (error) {
        console.error('Failed to fetch active academic period:', error);
        setStudentsError('Gagal memuat periode akademik aktif');
      } finally {
        setAcademicPeriodLoading(false);
      }
    };

    fetchActiveAcademicPeriod();
  }, [setValue, setStudentsError]);

  // Auto-fill student data when user selects a student
  useEffect(() => {
    if (selectedUserId) {
      const student = students?.find((s) => s.userId === Number(selectedUserId));
      if (student) {
        const newAutoFilledFields = new Set<string>();

        setValue('username', student.username);
        if (student.username) newAutoFilledFields.add('username');

        setValue('email', student.email);
        if (student.email) newAutoFilledFields.add('email');

        setValue('fullName', student.fullName || '');
        if (student.fullName) newAutoFilledFields.add('fullName');

        setValue('motivation', student.motivation || '');
        if (student.motivation) newAutoFilledFields.add('motivation');

        if (student.dateOfBirth) {
          const date = new Date(student.dateOfBirth);
          const formattedDate = date.toISOString().split('T')[0];
          setValue('dateOfBirth', formattedDate);
          newAutoFilledFields.add('dateOfBirth');
        } else {
          setValue('dateOfBirth', '');
        }

        setValue('noTelp', student.noTelp || '');
        if (student.noTelp) newAutoFilledFields.add('noTelp');

        setValue('lastEducation', student.lastEducation as Education);
        if (student.lastEducation) newAutoFilledFields.add('lastEducation');

        setValue('userId', student.userId);
        setValue('studentId', student.id);

        setAutoFilledFields(newAutoFilledFields);
        trigger();
      }
    }
  }, [selectedUserId, students, setValue, trigger]);

  // Handler untuk UsernameCreatableSelect
  const handleUsernameChange = (
    username: string,
    userData?: { email: string; displayName: string; userId: number }
  ) => {
    const newAutoFilledFields = new Set<string>();

    setValue('username', username, { shouldValidate: true });
    if (username) newAutoFilledFields.add('username');

    if (userData) {
      setValue('email', userData.email, { shouldValidate: true });
      if (userData.email) newAutoFilledFields.add('email');

      setValue('fullName', userData.displayName, { shouldValidate: true });
      if (userData.displayName) newAutoFilledFields.add('fullName');

      setValue('userId', userData.userId, { shouldValidate: true });
    } else {
      setValue('email', '', { shouldValidate: true });
      setValue('fullName', '', { shouldValidate: true });
      setValue('userId', undefined, { shouldValidate: true });
    }

    setAutoFilledFields(newAutoFilledFields);
  };

  // Helper function untuk menentukan disabled state
  const isFieldDisabled = (fieldName: string): boolean => {
    // Jika memilih student, disable field yang sudah terisi
    if (selectedUserId) {
      return autoFilledFields.has(fieldName);
    }
    // Jika memilih username, disable field yang sudah terisi
    if (watch('username') && autoFilledFields.has(fieldName)) {
      return true;
    }
    return false;
  };

  const handleFormSubmit = async (data: CreateEnrollmentRequest) => {
    setStudentsError(null);

    try {
      setLoading(true);

      const response = await addEnrollment(data);

      if (response) {
        setShowSuccess(true);
        setSuccessMessage({
          title: 'Pendaftaran Berhasil',
          description: 'Enrollment berhasil dibuat di sistem',
        });

        // Reset form
        reset();
        refreshStudent();
      }
    } catch (err: any) {
      const handled = handleApiError(err);
      console.log(err);
      setStudentsError(handled.message);
    } finally {
      setLoading(false);
    }
  };

  const studentOptions = [{ value: '', option: 'Pilih siswa' }].concat(
    students?.map((s) => ({
      value: s.userId.toString(),
      option: `${s.fullName} (${s.userId})`,
    })) || []
  );

  const enumToOptions = (e: any, placeholder: string) =>
    [{ value: '', option: placeholder }].concat(
      Object.keys(e)
        .filter((key) => isNaN(Number(key)))
        .map((key) => ({
          value: key,
          option: key,
        }))
    );

  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <Topbar title="Pendaftaran Offline" />
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title="Pendaftaran Offline" />

          <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Pilih Student */}
            <SelectInputWithLabel
              label={'Nama Siswa (User ID)'}
              options={studentOptions}
              value={watch('userId')?.toString() || ''}
              onChange={(e) => setValue('userId', Number(e.target.value))}
            />

            <UsernameCreatableSelect
              value={watch('username') || ''}
              onChange={handleUsernameChange}
              disabled={!!selectedUserId} // Tetap disabled jika sudah pilih student
              onBlur={() => trigger('username')}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}

            {/* Form Fields - Using TextInputWithLabelRHF */}

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
              disabled={isFieldDisabled('email')} // Gunakan helper function
            />

            <TextInputWithLabelRHF
              label={'Full Name'}
              id={'fullName'}
              type={'text'}
              registration={register('fullName', { required: 'Nama lengkap wajib diisi' })}
              error={errors.fullName?.message}
            />

            {/* Note: You'll need to create a similar RHF version for TextAreaWithLabel */}
            <TextAreaWithLabel
              label={'Motivation'}
              id={'motivation'}
              value={watch('motivation') || ''}
              onChange={(e) => setValue('motivation', e.target.value)}
              disabled={isFieldDisabled('motivation')} // Gunakan helper function
            />

            <TextInputWithLabelRHF
              label={'Date of Birth'}
              id={'dateOfBirth'}
              type={'date'}
              registration={register('dateOfBirth', {
                required: 'Tanggal lahir wajib diisi',
              })}
              error={errors.dateOfBirth?.message}
              disabled={isFieldDisabled('dateOfBirth')} // Gunakan helper function
            />

            <TextInputWithLabelRHF
              label={'No Telp'}
              id={'noTelp'}
              type={'text'}
              registration={register('noTelp', { required: 'Nomor telepon wajib diisi' })}
              error={errors.noTelp?.message}
              disabled={isFieldDisabled('noTelp')} // Gunakan helper function
            />

            <SelectInputWithLabel
              label={'Last Education'}
              options={enumToOptions(Education, 'Pilih pendidikan terakhir')}
              value={watch('lastEducation') || ''}
              onChange={(e) => setValue('lastEducation', e.target.value as Education)}
              disabled={isFieldDisabled('lastEducation')} // Gunakan helper function
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
              label={'Waktu belajar'}
              options={enumToOptions(TimeOfStudy, 'Pilih waktu belajar')}
              value={watch('timeOfStudy') || ''}
              onChange={(e) => setValue('timeOfStudy', e.target.value as TimeOfStudy)} // Extract value
            />

            {/* Academic Period - Display as text but store ID */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Periode Akademik</label>
              {academicPeriodLoading ? (
                <div className="animate-pulse bg-gray-200 rounded-md h-10"></div>
              ) : activeAcademicPeriod ? (
                <>
                  <input
                    type="hidden"
                    {...register('academicPeriodId', {
                      required: 'Periode akademik wajib dipilih',
                      valueAsNumber: true,
                    })}
                  />
                  <TextInputWithLabel
                    label={''}
                    id={'academicPeriodDisplay'}
                    type={'text'}
                    value={activeAcademicPeriod.name}
                    disabled={true}
                  />
                </>
              ) : (
                <div className="text-red-500 text-sm">Tidak ada periode akademik aktif</div>
              )}
              {errors.academicPeriodId && (
                <p className="text-red-500 text-sm mt-1">{errors.academicPeriodId.message}</p>
              )}
            </div>

            <PrimaryButton
              text={'Daftar'}
              type="submit"
              className={'w-full mt-5'}
              disabled={!isValid || loading || !activeAcademicPeriod}
            />
          </form>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" />
          Memuat data...
        </div>
      )}

      {/* Error Notification */}
      {studentsError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" />
          {studentsError}
          <button onClick={() => setStudentsError(null)} className="ml-2">
            ×
          </button>
        </div>
      )}

      {/* Success modal */}
      <ConfirmationSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={successMessage.title}
        description={successMessage.description}
      />
    </div>
  );
}

export default OfflineRegistrationPage;
