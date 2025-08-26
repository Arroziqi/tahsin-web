'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { format } from 'date-fns';
import { EnrollmentResponse } from '@/common/type/enrollment/enrollmentModel';
import EditEnrollmentModal from '@/components/modal/enrollment/EditEnrollmentModal';

interface EnrollmentTableProps {
  dataFetched: EnrollmentResponse[];
  loading?: boolean;
  error?: string | null;
  refreshEnrollments?: () => void;
}

function EnrollmentTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshEnrollments,
}: EnrollmentTableProps) {
  const [editingData, setEditingData] = useState<EnrollmentResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<EnrollmentResponse>[] = [
    {
      key: 'fullName',
      label: 'Nama Siswa',
      render: (_, row) => row.fullName,
      className: 'rounded-tl-lg',
    },
    {
      key: 'email',
      label: 'Email',
      render: (_, row) => row.email,
    },
    {
      key: 'noTelp',
      label: 'No. Telp',
      render: (_, row) => row.noTelp,
    },
    {
      key: 'lastEducation',
      label: 'Pendidikan Terakhir',
      render: (_, row) => row.lastEducation ?? '-',
    },
    {
      key: 'program',
      label: 'Program',
      render: (_, row) => row.program,
    },
    {
      key: 'classType',
      label: 'Jenis Kelas',
      render: (_, row) => row.classType,
    },
    {
      key: 'timeOfStudy',
      label: 'Waktu Belajar',
      render: (_, row) => row.timeOfStudy,
    },
    {
      key: 'dateOfBirth',
      label: 'Tanggal Lahir',
      render: (_, row) =>
        row.dateOfBirth ? format(new Date(row.dateOfBirth), 'dd MMM yyyy') : '-',
    },
    {
      key: 'dateOfReservation',
      label: 'Tanggal Reservasi',
      render: (_, row) =>
        row.dateOfReservation ? format(new Date(row.dateOfReservation), 'dd MMM yyyy') : '-',
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row) => (
        <div className="flex gap-3">
          <button
            className="text-[#828282] hover:text-blue-700 cursor-pointer"
            title="Edit"
            onClick={() => setEditingData(row)}
          >
            <Pencil size={16} />
          </button>
        </div>
      ),
      className: 'rounded-tr-lg text-center',
    },
  ];

  return (
    <>
      <GenericTableWrapper<EnrollmentResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={[
          'fullName',
          'email',
          'noTelp',
          'lastEducation',
          'program',
          'classType',
          'timeOfStudy',
          'dateOfReservation',
        ]}
        loading={loading}
        error={error}
      />

      {editingData && (
        <EditEnrollmentModal
          initialData={editingData}
          onClose={() => setEditingData(null)}
          refreshEnrollments={refreshEnrollments}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      <ConfirmationSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={successMessage.title}
        description={successMessage.description}
      />
    </>
  );
}

export default EnrollmentTable;
