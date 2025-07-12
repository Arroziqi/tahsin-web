import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import { TimeResponseDataType } from '@/hooks/fetchData/useTimes';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import EditTimeFormModal from '@/components/modal/time/EditTimeFormModal';
import AddTimeFormModal from '@/components/modal/time/AddTimeFormModal';

export interface TimeTableProps {
  dataFetched: TimeResponseDataType[];
  loading?: boolean;
  error?: string | null;
  refreshTimes?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Non Aktif'];
const statusValueMap = [undefined, 'Aktif', 'Non Aktif'];

function TimeTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshTimes,
}: TimeTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingTime, setEditingTime] = useState<TimeResponseDataType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<TimeResponseDataType>[] = [
    {
      key: 'session',
      label: 'Nama Sesi',
      className: 'rounded-tl-lg',
    },
    {
      key: 'startTime',
      label: 'Waktu Mulai',
    },
    {
      key: 'endTime',
      label: 'Waktu Selesai',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: string) => (
        <span
          className={`text-[#4B5563] font-medium px-[13px] py-[2px] rounded-sm ${
            value === 'Aktif' ? 'bg-[#EEFBD1] text-[#1F5305]' : 'bg-[#FCE6CF] text-[#CF0000]'
          }`}
        >
          {value || '-'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row) => (
        <div className="flex gap-3">
          <button
            className="text-[#828282] hover:text-blue-700 cursor-pointer"
            title="Edit"
            onClick={() => setEditingTime(row)}
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
      <GenericTableWrapper<TimeResponseDataType>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['session']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="status"
        addDataComponent={
          <AddTimeFormModal
            onSuccess={(msg: { title: string; description: string }) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
            refreshTimes={refreshTimes}
          />
        }
      />

      {editingTime && (
        <EditTimeFormModal
          initialData={editingTime}
          onClose={() => setEditingTime(null)}
          refreshTimes={refreshTimes}
          onSuccess={(msg: { title: string; description: string }) => {
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

export default TimeTable;
