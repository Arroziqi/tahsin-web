import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddEventModal from '@/components/modal/event/AddEventModal';
import EditEventModal from '@/components/modal/event/EditEventModal';
import { deleteEvent } from '@/lib/event/deleteEvent';
import { EventResponse } from '@/common/type/event/eventModel';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';

interface EventTableProps {
  dataFetched: EventResponse[];
  loading?: boolean;
  error?: string | null;
  refreshEvents?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Non Aktif'];

function EventTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshEvents,
}: EventTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingEvent, setEditingEvent] = useState<EventResponse | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<EventResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const handleDelete = async () => {
    if (!deletingEvent) return;

    try {
      const success = await deleteEvent(deletingEvent.id);
      if (success) {
        refreshEvents?.();
        setSuccessMessage({
          title: 'Event Berhasil Dihapus',
          description: `Event ${deletingEvent.name} telah dihapus dari sistem`,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setDeletingEvent(null);
    }
  };

  const columns: ColumnDefinition<EventResponse>[] = [
    {
      key: 'name',
      label: 'Nama Event',
      className: 'rounded-tl-lg',
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
          {value ? 'Aktif' : 'Non Aktif'}
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
            onClick={() => setEditingEvent(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingEvent(row)}
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
      <GenericTableWrapper<EventResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['name']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={
          <AddEventModal
            refreshEvents={refreshEvents}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingEvent && (
        <EditEventModal
          initialData={editingEvent}
          onClose={() => setEditingEvent(null)}
          refreshEvents={refreshEvents}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingEvent && (
        <ConfirmDeleteModal
          item={`event ${deletingEvent.name}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingEvent(null)}
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

export default EventTable;
