'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ModalWithForm from '@/components/modal/ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { handleApiError } from '@/lib/utils/errorHandler';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import useAcademicPeriods from '@/hooks/fetchData/useAcademicPeriods';
import { PaymentFeeResponse } from '@/common/type/paymentFee/paymentFeeModel';
import { FeeType, getFeeTypeOptions } from '@/common/type/paymentFee/paymentFeeTypeEnum';
import { updatePaymentFee } from '@/lib/paymentFee/updatePaymentFee';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';

interface EditPaymentFeeModalProps {
  initialData: PaymentFeeResponse;
  onClose?: () => void;
  refreshPaymentFees?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function EditPaymentFeeModal({
  initialData,
  onClose,
  refreshPaymentFees,
  onSuccess,
}: EditPaymentFeeModalProps) {
  const [open, setOpen] = useState(true);
  const [academicPeriodId, setAcademicPeriodId] = useState(initialData.academicPeriodId);
  const [feeType, setFeeType] = useState<FeeType>(initialData.feeType);
  const [amount, setAmount] = useState<string>(initialData.amount.toString());
  const [description, setDescription] = useState(initialData.description ?? '');
  const [dueDate, setDueDate] = useState<Date>(new Date(initialData.dueDate));
  const [isInvoiced, setIsInvoiced] = useState(initialData.isInvoiced);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: periods } = useAcademicPeriods();

  const activePeriods = useMemo(() => {
    return (periods ?? []).filter((p) => p.isActive === true);
  }, [periods]);

  const statusOptions = [
    { option: 'Aktif', value: 'true' },
    { option: 'Tidak Aktif', value: 'false' },
  ];

  useEffect(() => {
    setAcademicPeriodId(initialData.academicPeriodId);
    setFeeType(initialData.feeType);
    setAmount(initialData.amount.toString());
    setDescription(initialData.description ?? '');
    setDueDate(new Date(initialData.dueDate));
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response = await updatePaymentFee({
        id: initialData.id,
        academicPeriodId: Number(academicPeriodId),
        feeType,
        amount: Number(amount),
        description,
        dueDate,
        isInvoiced,
      });

      if (response) {
        refreshPaymentFees?.();
        onSuccess?.({
          title: 'Biaya Pembayaran Berhasil Diperbarui',
          description: 'Biaya Pembayaran berhasil diperbarui',
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
      title="Edit Biaya Pembayaran"
    >
      <div className="space-y-4">
        <SelectInputWithLabel
          label="Status invoice"
          value={isInvoiced ? 'active' : 'inactive'}
          onChange={(e) => setIsInvoiced(e.target.value === 'active')}
          options={[
            { option: 'Aktif', value: 'active' },
            { option: 'Tidak Aktif', value: 'inactive' },
          ]}
        />

        <SelectInputWithLabel
          label="Periode Akademik"
          value={academicPeriodId.toString()}
          onChange={(e) => setAcademicPeriodId(Number(e.target.value))}
          options={activePeriods.map((period) => ({
            option: period.name,
            value: period.id.toString(),
          }))}
        />

        <SelectInputWithLabel
          label="Jenis Pembayaran*"
          value={feeType}
          onChange={(e) => setFeeType(e.target.value as FeeType)}
          options={[
            ...getFeeTypeOptions().map(({ value, label }) => ({
              option: label,
              value,
            })),
          ]}
        />

        <TextInputWithLabel
          label={'Jumlah Biaya*'}
          id={'amount'}
          type={'number'}
          value={amount.toString()}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={'jumlah biaya yang harus dibayarkan'}
        />

        <TextInputWithLabel
          label={'Deskripsi'}
          id={'description'}
          type={'text'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={'deskripsi biaya'}
        />

        <div className="w-full">
          <DatePickerWithLabel
            id="dueDate"
            label="Tanggal Jatuh Tempo*"
            selectedDate={dueDate}
            onChange={(date: Date | null) => setDueDate(date!)}
            required
          />
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </ModalWithForm>
  );
}

export default EditPaymentFeeModal;
