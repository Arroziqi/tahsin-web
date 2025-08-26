'use client';

import React, { useEffect, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import { handleApiError } from '@/lib/utils/errorHandler';
import {
  TransactionResponse,
  TransactionStatusEnum,
} from '@/common/type/transactioin/transactionModel';
import { updateTransaction } from '@/lib/transaction/updateTransaction';
import { FeeType } from '@/common/type/paymentFee/paymentFeeTypeEnum';

interface EditTransactionModalProps {
  initialData: TransactionResponse;
  onClose?: () => void;
  refreshTransactions?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditTransactionModal({
  initialData,
  onClose,
  refreshTransactions,
  onSuccess,
}: EditTransactionModalProps) {
  const [open, setOpen] = useState(true);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatusEnum>(
    initialData.transactionStatus
  );
  const [amount, setAmount] = useState(initialData.amount.toString());

  // state
  const [transactionType, setTransactionType] = useState<FeeType>(initialData.transactionType);

  // daftar opsi
  const transactionTypeOptions = Object.values(FeeType).map((type) => ({
    option: type.replace('_', ' '),
    value: type,
  }));

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTransactionStatus(initialData.transactionStatus);
    setTransactionType(initialData.transactionType);
    setAmount(initialData.amount.toString());
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response: TransactionResponse = await updateTransaction({
        id: initialData.id,
        transactionStatus,
        transactionType,
        amount: Number(amount),
      });

      if (response) {
        refreshTransactions?.();
        onSuccess?.({
          title: 'Transaksi Berhasil Diperbarui',
          description: 'Data transaksi berhasil diperbarui',
        });
        setOpen(false);
        onClose?.();
      }
    } catch (err) {
      const handled = handleApiError(err);
      setError(handled.message);
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
      title="Edit Transaksi"
    >
      {/* Detail Transaksi */}
      <div className="space-y-2 p-3 rounded-md bg-gray-50 border">
        <p>
          <strong>Nama Siswa:</strong> {initialData.Student?.fullName}
        </p>
        <p>
          <strong>Tagihan:</strong> Rp {initialData.Bill?.bill.toLocaleString()}
        </p>
        <p>
          <strong>Sisa Tagihan:</strong> Rp {initialData.Bill?.remainBill.toLocaleString()}
        </p>
        <p>
          <strong>Deskripsi:</strong> {initialData.Bill?.description}
        </p>
      </div>

      {/* Form Input */}
      <div className="space-y-4 mt-4">
        <SelectInputWithLabel
          label="Jenis Transaksi"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value as FeeType)}
          options={transactionTypeOptions}
          disabled
        />

        <TextInputWithLabel
          label="Jumlah Transaksi"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Masukkan jumlah transaksi"
          disabled
        />

        <SelectInputWithLabel
          label="Status Transaksi*"
          value={transactionStatus}
          onChange={(e) => setTransactionStatus(e.target.value as TransactionStatusEnum)}
          options={Object.values(TransactionStatusEnum).map((status) => ({
            option: status,
            value: status,
          }))}
        />

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

export default EditTransactionModal;
