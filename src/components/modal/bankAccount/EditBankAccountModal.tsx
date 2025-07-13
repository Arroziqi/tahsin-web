import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { getErrorMessage, handleApiError } from '@/lib/utils/errorHandler';
import { updateBankAccount } from '@/lib/bankAccount/updateBankAccount';
import { BankAccountResponse } from '@/hooks/fetchData/useBankAccounts';

const bankOptions = [
  'BCA',
  'Mandiri',
  'BNI',
  'BRI',
  'CIMB Niaga',
  'Bank Syariah Indonesia',
  'Permata',
  'Danamon',
  'OCBC NISP',
];

interface EditBankAccountModalProps {
  initialData: BankAccountResponse;
  onClose?: () => void;
  refreshBankAccounts?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditBankAccountModal({
  initialData,
  onClose,
  refreshBankAccounts,
  onSuccess,
}: EditBankAccountModalProps) {
  const [open, setOpen] = useState(true);
  const [accountName, setAccountName] = useState(initialData.accountName);
  const [accountNumber, setAccountNumber] = useState(initialData.accountNumber);
  const [bankName, setBankName] = useState(initialData.bankName);
  const [status, setStatus] = useState(initialData.isActive ? 'Aktif' : 'Non Aktif');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAccountName(initialData.accountName);
    setAccountNumber(initialData.accountNumber);
    setBankName(initialData.bankName);
    setStatus(initialData.isActive ? 'Aktif' : 'Non Aktif');
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!accountName || !accountNumber || !bankName) {
      setError('Semua field wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const response = await updateBankAccount({
        id: initialData.id,
        accountName,
        accountNumber,
        bankName,
        isActive: status === 'Aktif',
      });

      if (response) {
        refreshBankAccounts?.();
        onSuccess?.({
          title: `Rekening Bank Berhasil Diperbarui`,
          description: `Rekening ${accountName} berhasil diperbarui di sistem`,
        });
        setOpen(false);
        onClose?.();
      }
    } catch (error) {
      const handled = handleApiError(error);
      setError(handled.message);
      console.error(getErrorMessage(handled));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWithForm
      isOpen={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      onSubmit={handleSubmit}
      title="Edit Rekening Bank"
    >
      <TextInputWithLabel
        id="accountName"
        type="text"
        label="Nama Pemilik Rekening*"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
        placeholder="Nama lengkap sesuai rekening"
      />

      <TextInputWithLabel
        id="accountNumber"
        type="text"
        label="Nomor Rekening*"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="Nomor rekening tanpa spasi"
      />

      <SelectInputWithLabel
        label="Nama Bank*"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
        options={bankOptions.map((bank) => ({
          option: bank,
          value: bank,
        }))}
      />

      <SelectInputWithLabel
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { option: 'Aktif', value: 'Aktif' },
          { option: 'Non Aktif', value: 'Non Aktif' },
        ]}
      />

      {error && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </ModalWithForm>
  );
}

export default EditBankAccountModal;
