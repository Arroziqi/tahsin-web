'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddAcademicCalendarModal from '@/components/modal/academicCalendar/AddAcademicCalendarModal';
import EditAcademicCalendarModal from '@/components/modal/academicCalendar/EditAcademicCalendarModal';
import { deleteAcademicCalendar } from '@/lib/academicCalendar/deleteAcademicCalendar';
import { AcademicCalendarResponse } from '@/common/type/academicCalendar/academicCalendarModel';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';
import { format } from 'date-fns';

interface AcademicCalendarTableProps {
  dataFetched: AcademicCalendarResponse[];
  loading?: boolean;
  error?: string | null;
  refreshAcademicCalendars?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Tidak Aktif'];

function AcademicCalendarTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshAcademicCalendars,
}: AcademicCalendarTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingCalendar, setEditingCalendar] = useState<AcademicCalendarResponse | null>(null);
  const [deletingCalendar, setDeletingCalendar] = useState<AcademicCalendarResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const handleDelete = async () => {
    if (!deletingCalendar) return;

    try {
      const success = await deleteAcademicCalendar(deletingCalendar.id);
      if (success) {
        refreshAcademicCalendars?.();
        setSuccessMessage({
          title: 'Kalender Akademik Berhasil Dihapus',
          description: `Event ${deletingCalendar.Event.name} telah dihapus dari sistem`,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting academic calendar:', error);
    } finally {
      setDeletingCalendar(null);
    }
  };

  const columns: ColumnDefinition<AcademicCalendarResponse>[] = [
    {
      key: 'academicPeriod',
      label: 'Periode Akademik',
      render: (_, row) => row.AcademicPeriod.name,
      className: 'rounded-tl-lg',
    },
    {
      key: 'event',
      label: 'Event',
      render: (_, row) => row.Event.name,
    },
    {
      key: 'dateRange',
      label: 'Tanggal',
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
            onClick={() => setEditingCalendar(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingCalendar(row)}
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
      <GenericTableWrapper<AcademicCalendarResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['AcademicPeriod.name', 'Event.name']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={
          <AddAcademicCalendarModal
            refreshAcademicCalendars={refreshAcademicCalendars}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingCalendar && (
        <EditAcademicCalendarModal
          initialData={editingCalendar}
          onClose={() => setEditingCalendar(null)}
          refreshAcademicCalendars={refreshAcademicCalendars}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingCalendar && (
        <ConfirmDeleteModal
          item={`event akademik ${deletingCalendar.Event.name}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingCalendar(null)}
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

export default AcademicCalendarTable;
