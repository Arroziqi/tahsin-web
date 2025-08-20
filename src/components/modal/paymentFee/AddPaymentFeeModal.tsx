'use client';

import { useMemo, useState } from 'react';
import useAcademicPeriods from '@/hooks/fetchData/academicPeriod/useAcademicPeriods';
import { addPaymentFee } from '@/lib/paymentFee/addPaymentFee';
import { PaymentFeeResponse } from '@/common/type/paymentFee/paymentFeeModel';
import { handleApiError } from '@/lib/utils/errorHandler';
import colors from '@/constants/colors';
import { FaPlusCircle } from 'react-icons/fa';
import ModalWithForm from '../ModalWithForm';
import SelectInputWithLabel from '@/components/input/SelectInputWithLabel';
import { FeeType, getFeeTypeOptions } from '@/common/type/paymentFee/paymentFeeTypeEnum';
import DatePickerWithLabel from '@/components/input/DatePickerWithLabel';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';

interface AddPaymentFeeModalProps {
  refreshPaymentFees?: () => void;
  onSuccess?: (message: { title: string; description: string }) => void;
}

function AddPaymentFeeModal({ refreshPaymentFees, onSuccess }: AddPaymentFeeModalProps) {
  const [open, setOpen] = useState(false);
  const [academicPeriodId, setAcademicPeriodId] = useState<string>('');
  const [feeType, setFeeType] = useState<FeeType>(FeeType.FINAL_INSTALLMENT);
  const [amount, setAmount] = useState<string>('0');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: periods } = useAcademicPeriods();

  const activePeriods = useMemo(() => {
    return (periods ?? []).filter((p) => p.isActive === true);
  }, [periods]);

  const resetForm = () => {
    setAcademicPeriodId('');
    setFeeType(FeeType.FINAL_INSTALLMENT);
    setAmount('');
    setDescription('');
    setDueDate(new Date());
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const response: PaymentFeeResponse = await addPaymentFee({
        academicPeriodId: Number(academicPeriodId),
        feeType,
        amount: Number(amount),
        description,
        dueDate,
      });

      if (response) {
        refreshPaymentFees?.();
        onSuccess?.({
          title: 'Biaya Pembayaran Berhasil Ditambahkan',
          description: 'Biaya pembayaran berhasil ditambahkan ke sistem',
        });
        setOpen(false);
        resetForm();
      }
    } catch (err: any) {
      const handled = handleApiError(err);
      setError(handled.message);
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
        Tambah Biaya Pembayaran
      </button>

      <ModalWithForm
        isOpen={open}
        onClose={() => {
          setOpen(false);
          resetForm();
        }}
        onSubmit={handleSubmit}
        title="Tambah Biaya Pembayaran"
      >
        <SelectInputWithLabel
          label="Periode Akademik*"
          value={academicPeriodId}
          onChange={(e) => setAcademicPeriodId(e.target.value)}
          options={[
            { option: 'Pilih periode akademik', value: '' },
            ...activePeriods.map((period) => ({
              option: period.name,
              value: period.id.toString(),
            })),
          ]}
        />

        <SelectInputWithLabel
          label="Jenis Pembayaran*"
          value={feeType}
          onChange={(e) => setFeeType(e.target.value as FeeType)}
          options={[
            { option: 'Pilih jenis pembayaran', value: '' },
            ...getFeeTypeOptions().map(({ value, label }) => ({
              option: label,
              value,
            })),
          ]}
        />

        <TextInputWithLabel
          label="Jumlah Biaya*"
          id="amount"
          type="number"
          placeholder="jumlah biaya yang harus dibayarkan"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <TextInputWithLabel
          label={'Deskripsi'}
          id={'description'}
          type={'text'}
          placeholder={'deskripsi biaya'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      </ModalWithForm>
    </>
  );
}

export default AddPaymentFeeModal;
