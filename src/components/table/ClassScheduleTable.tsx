'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { format } from 'date-fns';
import { ClassScheduleResponse } from '@/common/type/classSchedule/classScheduleModel';
import EditClassScheduleModal from '@/components/modal/classSchedule/EditClassScheduleModal';

interface ClassScheduleTableProps {
  dataFetched: ClassScheduleResponse[];
  loading?: boolean;
  error?: string | null;
  refreshClassSchedules?: () => void;
}

function ClassScheduleTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshClassSchedules,
}: ClassScheduleTableProps) {
  const [editingData, setEditingData] = useState<ClassScheduleResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<ClassScheduleResponse>[] = [
    {
      key: 'name',
      label: 'Nama Kelas',
      render: (value, row) => row.name,
      className: 'rounded-tl-lg',
    },
    {
      key: 'Level',
      label: 'Level',
      render: (_, row) => row.Level?.level ?? '-',
    },
    {
      key: 'Schedule',
      label: 'Jadwal',
      render: (_, row) =>
        row.Schedule ? `${row.Schedule.flattenedDay} - ${row.Schedule.flattenedSession}` : '-',
    },
    {
      key: 'Teacher',
      label: 'Pengajar',
      render: (_, row) => row.Teacher?.name ?? '-',
    },
    {
      key: 'startDate',
      label: 'Mulai',
      render: (_, row) => (row.startDate ? format(new Date(row.startDate), 'dd MMM yyyy') : '-'),
    },
    {
      key: 'endDate',
      label: 'Selesai',
      render: (_, row) => (row.endDate ? format(new Date(row.endDate), 'dd MMM yyyy') : '-'),
    },
    {
      key: 'capacity',
      label: 'Kapasitas',
      render: (_, row) => (row.capacity != null ? row.capacity : '-'),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_, row) => {
        const status = row.status ?? 'UNKNOWN';
        // jika kamu punya enum ClassScheduleStatus, bisa mapping warna di sini
        return (
          <span className="px-3 py-0.5 rounded text-sm bg-gray-100 text-gray-700">{status}</span>
        );
      },
    },
    {
      key: 'isActive',
      label: 'Aktif?',
      render: (_, row) =>
        row.isActive ? (
          <span className="text-green-700 font-medium">Aktif</span>
        ) : (
          <span className="text-gray-500">Non-aktif</span>
        ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row) => (
        <div className="flex gap-3 justify-center">
          <button
            className="text-[#828282] hover:text-blue-700"
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
      <GenericTableWrapper<ClassScheduleResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['name', 'Level.level', 'Schedule.name', 'Teacher.name']}
        loading={loading}
        error={error}
      />

      {editingData && (
        <EditClassScheduleModal
          initialData={editingData}
          onClose={() => setEditingData(null)}
          refreshClassSchedules={refreshClassSchedules}
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

export default ClassScheduleTable;
