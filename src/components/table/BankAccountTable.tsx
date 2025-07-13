import React, { useState } from 'react';
import { ColumnDefinition } from '@/components/table/RichTable';
import GenericTableWrapper from '@/components/table/GenericTableWrapper';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import AddBankAccountModal from '@/components/modal/bankAccount/AddBankAccountModal';
import EditBankAccountModal from '@/components/modal/bankAccount/EditBankAccountModal';
import { BankAccountResponse } from '@/hooks/fetchData/useBankAccounts';
import { deleteBankAccount } from '@/lib/bankAccount/deleteBankAccount';
import ConfirmDeleteModal from '@/components/modal/ConfirmationDeleteModal';

interface BankAccountTableProps {
  dataFetched: BankAccountResponse[];
  loading?: boolean;
  error?: string | null;
  refreshBankAccounts?: () => void;
}

const statusList = ['Semua', 'Aktif', 'Non Aktif'];

function BankAccountTable({
  dataFetched = [],
  loading = false,
  error = null,
  refreshBankAccounts,
}: BankAccountTableProps) {
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [editingAccount, setEditingAccount] = useState<BankAccountResponse | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<BankAccountResponse | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

  const handleDelete = async () => {
    if (!deletingAccount) return;

    try {
      const success = await deleteBankAccount(deletingAccount.id);
      if (success) {
        refreshBankAccounts?.();
        setSuccessMessage({
          title: 'Rekening Bank Berhasil Dihapus',
          description: `Rekening ${deletingAccount.accountName} berhasil dihapus dari sistem`,
        });
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error deleting bank account:', error);
      // You might want to show an error notification here
    } finally {
      setDeletingAccount(null);
    }
  };

  const columns: ColumnDefinition<BankAccountResponse>[] = [
    {
      key: 'accountName',
      label: 'Nama Pemilik',
      className: 'rounded-tl-lg',
    },
    {
      key: 'accountNumber',
      label: 'Nomor Rekening',
    },
    {
      key: 'bankName',
      label: 'Nama Bank',
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
            onClick={() => setEditingAccount(row)}
          >
            <Pencil size={16} />
          </button>
          <button
            className="text-[#828282] hover:text-red-700 cursor-pointer"
            title="Hapus"
            onClick={() => setDeletingAccount(row)}
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
      <GenericTableWrapper<BankAccountResponse>
        dataFetched={dataFetched}
        columns={columns}
        searchableFields={['accountName', 'accountNumber', 'bankName']}
        loading={loading}
        error={error}
        showStatusFilter
        statusList={statusList}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusFieldName="isActive"
        addDataComponent={
          <AddBankAccountModal
            refreshBankAccounts={refreshBankAccounts}
            onSuccess={(msg) => {
              setSuccessMessage(msg);
              setShowSuccess(true);
            }}
          />
        }
      />

      {editingAccount && (
        <EditBankAccountModal
          initialData={editingAccount}
          onClose={() => setEditingAccount(null)}
          refreshBankAccounts={refreshBankAccounts}
          onSuccess={(msg) => {
            setSuccessMessage(msg);
            setShowSuccess(true);
          }}
        />
      )}

      {deletingAccount && (
        <ConfirmDeleteModal
          item={`rekening bank ${deletingAccount.accountName}`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingAccount(null)}
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

export default BankAccountTable;
