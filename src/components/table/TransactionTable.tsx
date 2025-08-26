'use client';

import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { format } from 'date-fns';
import {
  TransactionResponse,
  TransactionStatusEnum,
} from '@/common/type/transactioin/transactionModel';
import EditTransactionModal from '@/components/modal/transaction/EditTransactionModal';

interface TransactionTableProps {
  dataFetched: TransactionResponse[];
  loading?: boolean;
  error?: string | null;
  refreshTransactions?: () => void;
}

// const statusList = ['Semua', 'Aktif', 'Tidak Aktif'];

function TransactionTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshTransactions,
}: TransactionTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingData, setEditingData] = useState<TransactionResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const columns: ColumnDefinition<TransactionResponse>[] = [
    {
      key: 'name',
      label: 'Nama Siswa',
      render: (_, row: TransactionResponse) => row.Student?.fullName,
      className: 'rounded-tl-lg',
    },
    {
      key: 'amount',
      label: 'Jumlah Pembayaran',
      render: (_, row: TransactionResponse) => row.amount,
    },
    {
      key: 'description',
      label: 'Deskripsi',
      render: (_, row: TransactionResponse) => row.Bill?.description,
    },
    {
      key: 'createdAt',
      label: 'Tanggal Pembayaran',
      render: (_, row: TransactionResponse) => (
        <span>{row.createdAt ? format(new Date(row.createdAt), 'dd MMM yyyy') : '-'}</span>
      ),
    },
    {
      key: 'transactionStatus',
      label: 'Status Pembayaran',
      render: (value: TransactionStatusEnum) => {
        let bg = '';
        let textColor = '';
        let label = '';

        switch (value) {
          case TransactionStatusEnum.SUCCESS:
            bg = 'bg-[#EEFBD1]';
            textColor = 'text-[#1F5305]';
            label = 'Berhasil';
            break;
          case TransactionStatusEnum.PENDING:
            bg = 'bg-[#FFF6C5]';
            textColor = 'text-[#92400E]';
            label = 'Menunggu';
            break;
          case TransactionStatusEnum.FAILED:
            bg = 'bg-[#FCE6CF]';
            textColor = 'text-[#CF0000]';
            label = 'Gagal';
            break;
          case TransactionStatusEnum.CANCELLED:
            bg = 'bg-[#E5E7EB]';
            textColor = 'text-[#374151]';
            label = 'Dibatalkan';
            break;
          default:
            bg = 'bg-gray-200';
            textColor = 'text-gray-600';
            label = value;
        }

        return (
          <span className={`font-medium px-[13px] py-[2px] rounded-sm ${bg} ${textColor}`}>
            {label}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Aksi',
      render: (_, row: TransactionResponse) => (
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
      <GenericTableWrapper<TransactionResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['Student.fullName', 'createdAt', 'Bill.description', 'amount']}
        loading={loading}
        error={error}
        onStatusChange={setSelectedStatus}
      />

      {editingData && (
        <EditTransactionModal
          initialData={editingData}
          onClose={() => setEditingData(null)}
          refreshTransactions={refreshTransactions}
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

export default TransactionTable;
