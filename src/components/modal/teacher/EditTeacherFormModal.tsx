import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { updateTeacher } from '@/lib/teacher/updateTeacher';

export interface TeacherResponseDataType {
  id: number;
  username: string;
  name: string;
  email: string;
  noTelp: string;
  status?: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
}

interface EditTeacherFormModalProps {
  initialData: TeacherResponseDataType;
  onClose?: () => void;
  refreshTeachers?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditTeacherFormModal({
  initialData,
  onClose,
  refreshTeachers,
  onSuccess,
}: EditTeacherFormModalProps) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'ON_LEAVE' | 'RESIGNED'>('ACTIVE');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(initialData.username);
    setName(initialData.name);
    setEmail(initialData.email);
    setNoTelp(initialData.noTelp);
    setStatus(initialData.status ?? 'ACTIVE');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const success = await updateTeacher({
        id: initialData.id,
        username,
        name,
        email,
        noTelp,
        status,
      });

      if (success) {
        refreshTeachers?.();
        onSuccess?.({
          title: `Guru Berhasil Diperbarui`,
          description: `Data guru ${name} berhasil diperbarui di sistem`,
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
      title="Edit Guru"
    >
      <TextInputWithLabel
        label="Username"
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Contoh: guru123"
      />

      <TextInputWithLabel
        label="Nama Lengkap"
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contoh: Budi Santoso"
      />

      <TextInputWithLabel
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Contoh: guru@email.com"
      />

      <TextInputWithLabel
        label="No. Telepon"
        id="noTelp"
        type="text"
        value={noTelp}
        onChange={(e) => setNoTelp(e.target.value)}
        placeholder="Contoh: 081234567890"
      />

      <SelectInputWithLabel
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED')}
        options={[
          { option: 'Aktif', value: 'ACTIVE' },
          { option: 'Cuti', value: 'ON_LEAVE' },
          { option: 'Resign', value: 'RESIGNED' },
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

export default EditTeacherFormModal;
