'use client';

import React, { useState } from 'react';
import useStudents from '@/hooks/fetchData/useStudents';
import Topbar from '@/components/topbar/Topbar';
import TitlePage from '@/components/text/TitlePage';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
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

function OfflineRegistrationPage() {
  const { data: students, error, setError } = useStudents();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = React.useState<Partial<CreateEnrollmentRequest>>({});
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);

  const isFormValid = React.useMemo(() => {
    const requiredFields: (keyof CreateEnrollmentRequest)[] = [
      'username',
      'email',
      'fullName',
      'motivation',
      'dateOfBirth',
      'noTelp',
      'lastEducation',
      'program',
      'classType',
      'timeOfStudy',
      'academicPeriodId',
    ];
    return requiredFields.every((field) => {
      const value = payload[field];
      if (field === 'dateOfBirth') return value instanceof Date && !isNaN(value.getTime());
      return value !== undefined && value !== null && value !== '';
    });
  }, [payload]);

  const handleChange = (field: string, value: any) => {
    setPayload((prev) => ({
      ...prev,
      [field]: value?.target?.value ?? value, // kalau value dari event, ambil value-nya
    }));
  };

  const handleSelectStudent = (userId: number) => {
    const student = students?.find((s) => s.userId === userId) || null;
    setSelectedStudent(student);

    if (student) {
      setPayload((prev) => ({
        ...prev,
        userId: student.userId,
        username: student.username, // sudah ada
        email: student.email, // sudah ada
        fullName: student.fullName || '',
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth) : undefined,
        noTelp: student.noTelp || '',
        lastEducation: student.lastEducation || undefined,
        motivation: student.motivation || '',
      }));
    } else {
      setPayload({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      // Kirim payload sesuai CreateEnrollmentRequest
      const response = await addEnrollment(payload as CreateEnrollmentRequest);

      if (response) {
        setShowSuccess(true);
        setSuccessMessage({
          title: 'Pendaftaran Berhasil',
          description: 'Enrollment berhasil dibuat di sistem',
        });

        // Reset form & state
        setPayload({});
        setSelectedStudent(null);
      }
    } catch (err: any) {
      const handled = handleApiError(err);
      console.log(err);
      setError(handled.message);
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
        .filter((key) => isNaN(Number(key))) // ambil hanya nama enum
        .map((key) => ({
          value: key, // simpan nama enum sebagai string
          option: key,
        }))
    );

  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <Topbar title="Pendaftaran Offline" />
      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto pt-[103px] flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
          <TitlePage title="Pendaftaran Offline" />

          {/* Pilih Student */}
          <SelectInputWithLabel
            label={'Nama Siswa (User ID)'}
            options={studentOptions}
            value={payload.userId?.toString() || ''} // biar sync
            onChange={(e) => handleSelectStudent(Number(e.target.value))}
          />

          {/* Form Fields */}
          <TextInputWithLabel
            label={'Username'}
            id={'username'}
            type={'text'}
            value={payload.username || ''}
            onChange={(e) => handleChange('username', e.target.value)}
            disabled={!!selectedStudent}
          />
          <TextInputWithLabel
            label={'Email'}
            id={'email'}
            type={'email'}
            value={payload.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            disabled={!!selectedStudent}
          />
          <TextInputWithLabel
            label={'Full Name'}
            id={'fullName'}
            type={'text'}
            value={payload.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            disabled={!!selectedStudent}
          />
          <TextAreaWithLabel
            label={'Motivation'}
            id={'motivation'}
            value={payload.motivation || ''}
            onChange={(e) => handleChange('motivation', e.target.value)}
            disabled={!!selectedStudent}
          />
          <TextInputWithLabel
            label={'Date of Birth'}
            id={'dateOfBirth'}
            type={'date'}
            value={
              payload.dateOfBirth ? new Date(payload.dateOfBirth).toISOString().split('T')[0] : ''
            }
            onChange={(e) => handleChange('dateOfBirth', new Date(e.target.value))}
            disabled={!!selectedStudent}
          />
          <TextInputWithLabel
            label={'No Telp'}
            id={'noTelp'}
            type={'text'}
            value={payload.noTelp || ''}
            onChange={(e) => handleChange('noTelp', e.target.value)}
            disabled={!!selectedStudent}
          />
          <SelectInputWithLabel
            label={'Last Education'}
            options={enumToOptions(Education, 'Pilih pendidikan terakhir')}
            value={payload.lastEducation || ''}
            onChange={(val) => handleChange('lastEducation', val)}
            disabled={!!selectedStudent}
          />

          <SelectInputWithLabel
            label={'Program'}
            options={enumToOptions(Program, 'Pilih program')}
            value={payload.program || ''}
            onChange={(val) => handleChange('program', val)}
          />
          <SelectInputWithLabel
            label={'Jenis Kelas'}
            options={enumToOptions(ClassType, 'Pilih jenis kelas')}
            value={payload.classType || ''}
            onChange={(val) => handleChange('classType', val)}
          />
          <SelectInputWithLabel
            label={'Waktu belajar'}
            options={enumToOptions(TimeOfStudy, 'Pilih waktu belajar')}
            value={payload.timeOfStudy || ''}
            onChange={(val) => handleChange('timeOfStudy', val)}
          />
          <TextInputWithLabel
            label={'Academic Period ID'}
            id={'academicPeriodId'}
            type={'number'}
            value={payload.academicPeriodId?.toString() || ''}
            onChange={(e) => handleChange('academicPeriodId', Number(e.target.value))}
          />

          <PrimaryButton
            text={'Daftar'}
            onClick={handleSubmit}
            className={'w-full'}
            disabled={!isFormValid}
          />
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
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" />
          {error}
          <button onClick={() => setError(null)} className="ml-2">
            ×
          </button>
        </div>
      )}

      {/*  success modal*/}
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
