import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import { DayResponseDataType } from '@/hooks/fetchData/useDays';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddDayFormModal from '@/components/modal/day/AddDayFormModal';
import EditDayFormModal from '@/components/modal/day/EditDayFormModal';

interface DayTableProps {
  dataFetched: DayResponseDataType[];
  loading?: boolean;
  error?: string | null;
  refreshDays?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Non Aktif'];
const statusValueMap = [undefined, 'Aktif', 'Non Aktif'];

function DayTable({ dataFetched = [], loading = false, error = null, refreshDays }: DayTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingDay, setEditingDay] = useState<DayResponseDataType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<DayResponseDataType>[] = [
    {
      key: 'day',
      label: 'Hari',
      className: 'rounded-tl-lg',
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
            onClick={() => setEditingDay(row)}
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
      <GenericTableWrapper<DayResponseDataType>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['day']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="status"
        addDataComponent={
          <AddDayFormModal
            refreshDays={refreshDays}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingDay && (
        <EditDayFormModal
          initialData={editingDay}
          onClose={() => setEditingDay(null)}
          refreshDays={refreshDays}
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

export default DayTable;
