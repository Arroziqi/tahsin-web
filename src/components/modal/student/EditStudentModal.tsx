'use client';

import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import { handleApiError } from '@/lib/utils/errorHandler';
import { Education } from '@/common/type/enrollment/enrollmentEnum';
import { StudentResponse, UpdateStudentRequest } from '@/common/type/student/studentModel';
import { StudentStatusEnum } from '@/common/type/student/studentEnum';
import useLevels, { LevelResponseDataType } from '@/hooks/fetchData/useLevels';
import { updateStudent } from '@/lib/student/updateStudent';

interface EditStudentModalProps {
  initialData: StudentResponse;
  onClose?: () => void;
  refreshStudents?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditStudentModal({
  initialData,
  onClose,
  refreshStudents,
  onSuccess,
}: EditStudentModalProps) {
  const [open, setOpen] = useState(true);

  // ambil level dari hook
  const { data: levels, loading: levelLoading, error: levelError } = useLevels();

  // state untuk field student
  const [fullName, setFullName] = useState(initialData.fullName);
  const [noTelp, setNoTelp] = useState(initialData.noTelp || '');
  const [dateOfBirth, setDateOfBirth] = useState(
    initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : ''
  );
  const [lastEducation, setLastEducation] = useState<Education | null>(
    initialData.lastEducation ?? null
  );
  const [levelId, setLevelId] = useState<number | null>(initialData.levelId ?? null);
  const [studentStatus, setStudentStatus] = useState<StudentStatusEnum | null>(
    initialData.studentStatus ?? null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFullName(initialData.fullName);
    setNoTelp(initialData.noTelp || '');
    setDateOfBirth(
      initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : ''
    );
    setLastEducation(initialData.lastEducation ?? null);
    setLevelId(initialData.levelId ?? null);
    setStudentStatus(initialData.studentStatus ?? null);
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const payload: UpdateStudentRequest = {
        id: initialData.id,
        fullName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        noTelp,
        lastEducation,
        levelId,
        studentStatus,
      };

      console.log('payl;oad', payload);

      await updateStudent(payload);

      refreshStudents?.();
      onSuccess?.({
        title: 'Data Siswa Diperbarui',
        description: 'Informasi siswa berhasil diperbarui',
      });
      setOpen(false);
      onClose?.();
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
      onSubmit={handleSubmit}
      title="Edit Siswa"
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
          value={lastEducation ?? ''}
          onChange={(e) => setLastEducation(e.target.value as Education)}
          options={Object.values(Education).map((edu) => ({
            option: edu,
            value: edu,
          }))}
        />

        <SelectInputWithLabel
          label="Level"
          value={levelId?.toString() ?? ''}
          onChange={(e) => setLevelId(e.target.value ? Number(e.target.value) : null)}
          options={
            levelLoading
              ? [{ option: 'Loading...', value: '' }]
              : levelError
                ? [{ option: 'Error memuat level', value: '' }]
                : levels.map((lvl: LevelResponseDataType) => ({
                    option: lvl.level,
                    value: lvl.id.toString(), // 👈 pastikan value string
                  }))
          }
        />

        <SelectInputWithLabel
          label="Status Siswa"
          value={studentStatus ?? ''}
          onChange={(e) => setStudentStatus(e.target.value as StudentStatusEnum)}
          options={Object.values(StudentStatusEnum).map((s) => ({
            option: s,
            value: s,
          }))}
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

export default EditStudentModal;
