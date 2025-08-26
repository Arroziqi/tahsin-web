'use client';

import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import { handleApiError } from '@/lib/utils/errorHandler';
import {
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from '@/common/type/enrollment/enrollmentModel';
import {
  ClassType,
  Education,
  Program,
  TimeOfStudy,
} from '@/common/type/enrollment/enrollmentEnum';

// import { updateEnrollment } from '@/services/enrollmentService'; // asumsi ada service

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

  // state untuk field enrollment
  const [fullName, setFullName] = useState(initialData.fullName);
  const [email, setEmail] = useState(initialData.email);
  const [noTelp, setNoTelp] = useState(initialData.noTelp);
  const [dateOfBirth, setDateOfBirth] = useState(
    initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : ''
  );
  const [lastEducation, setLastEducation] = useState<Education>(initialData.lastEducation);
  const [program, setProgram] = useState<Program>(initialData.program);
  const [classType, setClassType] = useState<ClassType>(initialData.classType);
  const [timeOfStudy, setTimeOfStudy] = useState<TimeOfStudy>(initialData.timeOfStudy);
  const [motivation, setMotivation] = useState(initialData.motivation || '');
  const [dateOfReservation, setDateOfReservation] = useState(
    initialData.dateOfReservation
      ? new Date(initialData.dateOfReservation).toISOString().split('T')[0]
      : ''
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(initialData.fullName);
    setEmail(initialData.email);
    setNoTelp(initialData.noTelp);
    setDateOfBirth(
      initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : ''
    );
    setLastEducation(initialData.lastEducation);
    setProgram(initialData.program);
    setClassType(initialData.classType);
    setTimeOfStudy(initialData.timeOfStudy);
    setMotivation(initialData.motivation || '');
    setDateOfReservation(
      initialData.dateOfReservation
        ? new Date(initialData.dateOfReservation).toISOString().split('T')[0]
        : ''
    );
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const payload: UpdateEnrollmentRequest = {
        id: initialData.id,
        username: email, // asumsi username = email
        email,
        fullName,
        motivation,
        dateOfBirth: new Date(dateOfBirth),
        noTelp,
        lastEducation,
        program,
        classType,
        timeOfStudy,
        voiceRecording: initialData.voiceRecording,
        dateOfReservation: dateOfReservation ? new Date(dateOfReservation) : undefined,
        academicPeriodId: initialData.academicPeriodId,
        userId: initialData.userId,
        classId: initialData.classId,
      };

      // const response = await updateEnrollment(payload);

      // if (response) {
      refreshEnrollments?.();
      onSuccess?.({
        title: 'Pendaftaran Berhasil Diperbarui',
        description: 'Data pendaftaran berhasil diperbarui',
      });
      setOpen(false);
      onClose?.();
      // }
    } catch (err) {
      const handled = handleApiError(err);
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
      title="Edit Pendaftaran"
    >
      <div className="space-y-4 mt-4">
        <TextInputWithLabel
          label="Nama Lengkap"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextInputWithLabel
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextInputWithLabel
          label="No. Telepon"
          id="noTelp"
          type="text"
          value={noTelp}
          onChange={(e) => setNoTelp(e.target.value)}
        />

        <TextInputWithLabel
          label="Tanggal Lahir"
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <SelectInputWithLabel
          label="Pendidikan Terakhir"
          value={lastEducation}
          onChange={(e) => setLastEducation(e.target.value as Education)}
          options={Object.values(Education).map((edu) => ({
            option: edu,
            value: edu,
          }))}
        />

        <SelectInputWithLabel
          label="Program"
          value={program}
          onChange={(e) => setProgram(e.target.value as Program)}
          options={Object.values(Program).map((p) => ({
            option: p,
            value: p,
          }))}
        />

        <SelectInputWithLabel
          label="Jenis Kelas"
          value={classType}
          onChange={(e) => setClassType(e.target.value as ClassType)}
          options={Object.values(ClassType).map((c) => ({
            option: c,
            value: c,
          }))}
        />

        <SelectInputWithLabel
          label="Waktu Belajar"
          value={timeOfStudy}
          onChange={(e) => setTimeOfStudy(e.target.value as TimeOfStudy)}
          options={Object.values(TimeOfStudy).map((t) => ({
            option: t,
            value: t,
          }))}
        />

        <TextInputWithLabel
          label="Motivasi"
          id="motivation"
          type="text"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
        />

        <TextInputWithLabel
          label="Tanggal Reservasi (opsional)"
          id="dateOfReservation"
          type="date"
          value={dateOfReservation}
          onChange={(e) => setDateOfReservation(e.target.value)}
        />

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

export default EditEnrollmentModal;
