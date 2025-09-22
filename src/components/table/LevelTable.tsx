import { ColumnDefinition } from '@/components/table/RichTable';
import React, { useState } from 'react';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import AddLevelFormModal from '@/components/modal/level/AddLevelFormModal';
import { Pencil, Trash2 } from 'lucide-react';
import { LevelResponseDataType } from '@/hooks/fetchData/level/useLevels';
import EditLevelFormModal from '@/components/modal/level/EditLevelFormModal';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';
import { deleteLevel } from '@/lib/level/deleteLevel';

interface LevelTableProps {
  dataFetched: LevelResponseDataType[];
  loading?: boolean;
  error?: string | null;
  refreshLevels?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Tidak Aktif'];
const statusValueMap = [undefined, 'Aktif', 'Tidak Aktif'];

function LevelTable({ dataFetched, loading, error, refreshLevels }: LevelTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingLevel, setEditingLevel] = useState<LevelResponseDataType | null>(null);
  const [deletingLevel, setDeletingLevel] = useState<LevelResponseDataType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<LevelResponseDataType>[] = [
    { key: 'level', label: 'Nama Level', className: 'rounded-tl-lg' },
    {
      key: 'isActive',
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
            onClick={() => setEditingLevel(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingLevel(row)}
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
      <GenericTableWrapper<LevelResponseDataType>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['level']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={<AddLevelFormModal refreshLevels={refreshLevels} />}
      />

      {editingLevel && (
        <EditLevelFormModal
          initialData={editingLevel}
          onClose={() => setEditingLevel(null)}
          refreshLevels={refreshLevels}
          onSuccess={(msg: { title: string; description: string }) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingLevel && (
        <ConfirmDeleteModal
          item={deletingLevel.level}
          onConfirm={async () => {
            try {
              await deleteLevel(deletingLevel.id);
              setSuccessMessage({
                title: 'Level Dihapus',
                description: `Level ${deletingLevel.level} berhasil dihapus.`,
              });
              setShowSuccess(true);
              refreshLevels?.();
            } catch (error) {
              alert(
                (error as any)?.response?.data?.message ||
                  'Gagal menghapus level. Pastikan tidak digunakan di data lain.'
              );
            } finally {
              setDeletingLevel(null);
            }
          }}
          onCancel={() => setDeletingLevel(null)}
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

export default LevelTable;
