import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import { ScheduleResponseDataType } from '@/hooks/fetchData/schedule/useSchedules';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddScheduleFormModal from '@/components/modal/schedule/AddScheduleFormModal';
import EditScheduleFormModal from '@/components/modal/schedule/EditScheduleFormModal';

interface ScheduleTableProps {
  dataFetched: ScheduleResponseDataType[];
  loading?: boolean;
  error?: string | null;
  refreshSchedules?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Non Aktif'];

function ScheduleTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshSchedules,
}: ScheduleTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleResponseDataType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<ScheduleResponseDataType>[] = [
    {
      key: 'flattenedDay',
      label: 'Hari',
      className: 'rounded-tl-lg',
      render: (_, row) => row.flattenedDay || '-',
    },
    {
      key: 'flattenedSession',
      label: 'Sesi',
      render: (_, row) => row.flattenedSession || '-',
    },
    {
      key: 'classType',
      label: 'Tipe Kelas',
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (_, row) => {
        const status = row.isActive ? 'Aktif' : 'Non Aktif';
        return (
          <span
            className={`text-[#4B5563] font-medium px-[13px] py-[2px] rounded-sm ${
              status === 'Aktif' ? 'bg-[#EEFBD1] text-[#1F5305]' : 'bg-[#FCE6CF] text-[#CF0000]'
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row) => (
        <div className="flex gap-3">
          <button
            className="text-[#828282] hover:text-blue-700 cursor-pointer"
            title="Edit"
            onClick={() => setEditingSchedule(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => console.log('Hapus', row.id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
      className: 'rounded-tr-lg text-center',
    },
  ];

  return (
    <>
      <GenericTableWrapper<ScheduleResponseDataType>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['flattenedDay', 'flattenedSession', 'classType']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={
          <AddScheduleFormModal
            refreshSchedules={refreshSchedules}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingSchedule && (
        <EditScheduleFormModal
          initialData={editingSchedule}
          onClose={() => setEditingSchedule(null)}
          refreshSchedules={refreshSchedules}
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

export default ScheduleTable;
