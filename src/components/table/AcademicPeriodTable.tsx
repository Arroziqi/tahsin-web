'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddAcademicPeriodModal from '@/components/modal/academicPeriod/AddAcademicPeriodModal';
import EditAcademicPeriodModal from '@/components/modal/academicPeriod/EditAcademicPeriodModal';
import { deleteAcademicPeriod } from '@/lib/academicPeriod/deleteAcademicPeriod';
import { AcademicPeriodResponse } from '@/common/type/academicPeriod/academicPeriodModel';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';
import { format } from 'date-fns';

interface AcademicPeriodTableProps {
  dataFetched: AcademicPeriodResponse[];
  loading?: boolean;
  error?: string | null;
  refreshAcademicPeriods?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Tidak Aktif'];

function AcademicPeriodTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshAcademicPeriods,
}: AcademicPeriodTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingPeriod, setEditingPeriod] = useState<AcademicPeriodResponse | null>(null);
  const [deletingPeriod, setDeletingPeriod] = useState<AcademicPeriodResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const handleDelete = async () => {
    if (!deletingPeriod) return;

    try {
      const success = await deleteAcademicPeriod(deletingPeriod.id);
      if (success) {
        refreshAcademicPeriods?.();
        setSuccessMessage({
          title: 'Periode Akademik Berhasil Dihapus',
          description: `Periode ${deletingPeriod.name} telah dihapus dari sistem`,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting academic period:', error);
    } finally {
      setDeletingPeriod(null);
    }
  };

  const columns: ColumnDefinition<AcademicPeriodResponse>[] = [
    {
      key: 'name',
      label: 'Nama Periode',
      className: 'rounded-tl-lg',
    },
    {
      key: 'description',
      label: 'Deskripsi',
      render: (value: string) => (
        <span className="line-clamp-2" title={value}>
          {value || '-'}
        </span>
      ),
    },
    {
      key: 'dateRange',
      label: 'Periode',
      render: (_, row) => (
        <span>
          {format(new Date(row.startDate), 'dd MMM yyyy')} -{' '}
          {format(new Date(row.endDate), 'dd MMM yyyy')}
        </span>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value: boolean) => (
        <span
          className={`text-[#4B5563] font-medium px-[13px] py-[2px] rounded-sm ${
            value ? 'bg-[#EEFBD1] text-[#1F5305]' : 'bg-[#FCE6CF] text-[#CF0000]'
          }`}
        >
          {value ? 'Aktif' : 'Tidak Aktif'}
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
            onClick={() => setEditingPeriod(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingPeriod(row)}
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
      <GenericTableWrapper<AcademicPeriodResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['name', 'description']} // Tambahkan description ke searchable fields
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={
          <AddAcademicPeriodModal
            refreshAcademicPeriods={refreshAcademicPeriods}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingPeriod && (
        <EditAcademicPeriodModal
          initialData={editingPeriod}
          onClose={() => setEditingPeriod(null)}
          refreshAcademicPeriods={refreshAcademicPeriods}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingPeriod && (
        <ConfirmDeleteModal
          item={`periode akademik ${deletingPeriod.name}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingPeriod(null)}
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

export default AcademicPeriodTable;
