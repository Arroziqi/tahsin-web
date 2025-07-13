import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import { addBankAccount } from '@/lib/bankAccount/addBankAccount';

interface AddBankAccountModalProps {
  refreshBankAccounts?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

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

function AddBankAccountModal({ refreshBankAccounts, onSuccess }: AddBankAccountModalProps) {
  const [open, setOpen] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState(bankOptions[0]); // Initialize with first option
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize bankName when component mounts
  useEffect(() => {
    if (bankOptions.length > 0 && !bankName) {
      setBankName(bankOptions[0]);
    }
  }, []);

  const resetForm = () => {
    setAccountName('');
    setAccountNumber('');
    setBankName(bankOptions[0] || '');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!accountName || !accountNumber || !bankName) {
      setError('Semua field wajib diisi');
      return;
    }

    try {
      setLoading(true);
      const response = await addBankAccount({
        accountName,
        accountNumber,
        bankName,
      });

      if (response) {
        refreshBankAccounts?.();
        onSuccess?.({
          title: `Rekening Bank Berhasil Ditambahkan`,
          description: `Rekening ${accountName} berhasil ditambahkan di sistem`,
        });
        setOpen(false);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error adding bank account:', err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).join('\n');
        setError(errorMessages);
      } else if (err.request) {
        setError('Tidak ada respon dari server');
      } else {
        setError(err.message || 'Terjadi kesalahan');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white px-3 py-2 rounded-lg flex items-center gap-2 w-fit font-medium cursor-pointer"
        style={{ backgroundColor: colors.C06 }}
      >
        <FaPlusCircle size={20} />
        Tambah Rekening Bank
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Rekening Bank"
      >
        <TextInputWithLabel
          id={'accountName'}
          type={'text'}
          label="Nama Pemilik Rekening*"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          placeholder="Nama lengkap sesuai rekening"
        />

        <TextInputWithLabel
          id={'accountNumber'}
          type={'text'}
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

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </ModalWithForm>
    </>
  );
}

export default AddBankAccountModal;
