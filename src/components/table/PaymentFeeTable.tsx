'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';
import { format } from 'date-fns';
import { PaymentFeeResponse } from '@/common/type/paymentFee/paymentFeeModel';
import { deletePaymentFee } from '@/lib/paymentFee/deletePaymentFee';
import AddPaymentFeeModal from '@/components/modal/paymentFee/AddPaymentFeeModal';
import EditPaymentFeeModal from '@/components/modal/paymentFee/EditPaymentFeeModal';

interface PaymentFeeTableProps {
  dataFetched: PaymentFeeResponse[];
  loading?: boolean;
  error?: string | null;
  refreshPaymentFees?: () => void;
}

// const statusList = ['Semua', 'Aktif', 'Tidak Aktif'];

function PaymentFeeTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshPaymentFees,
}: PaymentFeeTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingData, setEditingData] = useState<PaymentFeeResponse | null>(null);
  const [deletingData, setDeletingData] = useState<PaymentFeeResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const handleDelete = async () => {
    if (!deletingData) return;

    try {
      const success = await deletePaymentFee(deletingData.id);
      if (success) {
        refreshPaymentFees?.();
        setSuccessMessage({
          title: 'Payment Fee Berhasil Dihapus',
          description: `Payment Fee telah dihapus dari sistem`,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setDeletingData(null);
    }
  };

  const columns: ColumnDefinition<PaymentFeeResponse>[] = [
    {
      key: 'academicPeriod',
      label: 'Periode Akademik',
      render: (_, row: PaymentFeeResponse) => row.AcademicPeriod.name,
      className: 'rounded-tl-lg',
    },
    {
      key: 'feeType',
      label: 'Jenis Pembayaran',
      render: (_, row: PaymentFeeResponse) => row.feeType,
    },
    {
      key: 'amount',
      label: 'Jumlah Pembayaran',
      render: (_, row: PaymentFeeResponse) => row.amount,
    },
    {
      key: 'description',
      label: 'Deskripsi',
      render: (_, row: PaymentFeeResponse) => row.description,
    },
    {
      key: 'dueDate',
      label: 'Jatuh Tempo',
      render: (_, row: PaymentFeeResponse) => (
        <span>{format(new Date(row.dueDate), 'dd MMM yyyy')}</span>
      ),
    },
    {
      key: 'isInvoiced',
      label: 'Status Invoice',
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
    // {
    //   key: 'isActive',
    //   label: 'Status',
    //   render: (value: boolean) => (
    //     <span
    //       className={`text-[#4B5563] font-medium px-[13px] py-[2px] rounded-sm ${
    //         value ? 'bg-[#EEFBD1] text-[#1F5305]' : 'bg-[#FCE6CF] text-[#CF0000]'
    //       }`}
    //     >
    //       {value ? 'Aktif' : 'Tidak Aktif'}
    //     </span>
    //   ),
    // },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row: PaymentFeeResponse) => (
        <div className="flex gap-3">
          <button
            className="text-[#828282] hover:text-blue-700 cursor-pointer"
            title="Edit"
            onClick={() => setEditingData(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingData(row)}
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
      <GenericTableWrapper<PaymentFeeResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['AcademicPeriod.name', 'feeType', 'description', 'amount']}
        loading={loading}
        error={error}
        showStatusFilter
        // statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isInvoiced"
        addDataComponent={
          <AddPaymentFeeModal
            refreshPaymentFees={refreshPaymentFees}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingData && (
        <EditPaymentFeeModal
          initialData={editingData}
          onClose={() => setEditingData(null)}
          refreshPaymentFees={refreshPaymentFees}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingData && (
        <ConfirmDeleteModal
          item={`biaya pembayaran sebesar ${deletingData.amount}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingData(null)}
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

export default PaymentFeeTable;
