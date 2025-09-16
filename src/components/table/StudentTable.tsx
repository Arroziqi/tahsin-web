'use client';

import React, { useMemo, useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { format } from 'date-fns';
import { StudentResponse } from '@/common/type/student/studentModel';
import EditStudentModal from '@/components/modal/student/EditStudentModal';
import useLevels, { LevelResponseDataType } from '@/hooks/fetchData/useLevels';

interface StudentTableProps {
  dataFetched: StudentResponse[];
  loading?: boolean;
  error?: string | null;
  refreshStudents?: () => void;
}

function StudentTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshStudents,
}: StudentTableProps) {
  const [editingData, setEditingData] = useState<StudentResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  // ambil data level
  const { data: levels, loading: levelLoading } = useLevels();

  // bikin map id → level name biar gampang lookup
  const levelMap = useMemo(() => {
    const map: Record<number, string> = {};
    (levels || []).forEach((lvl: LevelResponseDataType) => {
      map[lvl.id] = lvl.level;
    });
    return map;
  }, [levels]);

  const columns: ColumnDefinition<StudentResponse>[] = [
    {
      key: 'fullName',
      label: 'Nama Siswa',
      render: (_, row) => row.fullName,
      className: 'rounded-tl-lg',
    },
    {
      key: 'username',
      label: 'Username',
      render: (_, row) => row.username,
    },
    {
      key: 'email',
      label: 'Email',
      render: (_, row) => row.email,
    },
    {
      key: 'noTelp',
      label: 'No. Telp',
      render: (_, row) => row.noTelp ?? '-',
    },
    {
      key: 'lastEducation',
      label: 'Pendidikan Terakhir',
      render: (_, row) => row.lastEducation ?? '-',
    },
    {
      key: 'motivation',
      label: 'Motivasi',
      render: (_, row) => row.motivation ?? '-',
    },
    {
      key: 'levelId',
      label: 'Level',
      render: (_, row) => (levelLoading ? 'Loading...' : (levelMap[row.levelId ?? -1] ?? '-')),
    },
    {
      key: 'studentStatus',
      label: 'Status',
      render: (_, row) => row.studentStatus,
    },
    {
      key: 'dateOfBirth',
      label: 'Tanggal Lahir',
      render: (_, row) =>
        row.dateOfBirth ? format(new Date(row.dateOfBirth), 'dd MMM yyyy') : '-',
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
      <GenericTableWrapper<StudentResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={[
          'fullName',
          'username',
          'email',
          'noTelp',
          'lastEducation',
          'motivation',
          'studentStatus',
        ]}
        loading={loading}
        error={error}
      />

      {editingData && (
        <EditStudentModal
          initialData={editingData}
          onClose={() => setEditingData(null)}
          refreshStudents={refreshStudents}
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

export default StudentTable;
