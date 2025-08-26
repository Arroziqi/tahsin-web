// CashPaymentPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import useStudents from '@/hooks/fetchData/useStudents';
import PrimaryButton from '@/components/button/PrimaryButton';
import ConfirmationSuccessModal from '@/components/modal/ConfirmationSuccessModal';
import { handleApiError } from '@/lib/utils/errorHandler';
import TextInputWithLabel from '@/components/input/TextInputWithLabel';
import { useForm } from 'react-hook-form';
import {
  CreateTransactionRequest,
  TransactionStatusEnum,
} from '@/common/type/transactioin/transactionModel';
import { FeeType } from '@/common/type/paymentFee/paymentFeeTypeEnum';
import { getBillByStudentId } from '@/lib/bill/getBillByStudentId';
import { BillResponse } from '@/common/type/bill/billModel';
import { addTransaction } from '@/lib/transaction/addTransaction';
import StudentSelect from '@/components/ui/StudentSelect';

function CashPaymentPage() {
  const { error: studentsError, setError: setStudentsError } = useStudents();

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [studentBill, setStudentBill] = useState<BillResponse | null>(null);
  const [fetchingBill, setFetchingBill] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null); // ✅ state

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm<CreateTransactionRequest>({
    mode: 'onChange',
    defaultValues: {
      bankAccountId: 1,
      billId: 0,
      transactionType: FeeType.DOWN_PAYMENT,
      transactionStatus: TransactionStatusEnum.SUCCESS,
      amount: 0,
    },
  });

  const amount = watch('amount');

  // ✅ setiap kali student berubah -> otomatis fetch bill
  useEffect(() => {
    if (!selectedStudentId) {
      setStudentBill(null);
      setValue('billId', 0);
      return;
    }

    const fetchBill = async () => {
      try {
        setFetchingBill(true);
        const billData = await getBillByStudentId(selectedStudentId);
        setStudentBill(billData);

        // langsung set billId setelah data didapat
        setValue('billId', billData.id);
      } catch (err: any) {
        const handled = handleApiError(err);
        setStudentsError(handled.message);
        setStudentBill(null);
      } finally {
        setFetchingBill(false);
      }
    };

    fetchBill();
  }, [selectedStudentId, setValue, setStudentsError]);

  // Handler select student
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId ? Number(studentId) : null);
  };

  // Handler input amount
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (studentBill && value > studentBill.remainBill) {
      setValue('amount', studentBill.remainBill);
    } else {
      setValue('amount', value);
    }

    setTimeout(() => trigger('amount'), 100);
  };

  const handleFormSubmit = async (payload: CreateTransactionRequest) => {
    setStudentsError(null);

    try {
      setLoading(true);

      if (studentBill && payload.amount > studentBill.remainBill) {
        setStudentsError('Jumlah pembayaran tidak boleh melebihi sisa tagihan');
        return;
      }

      const response = await addTransaction(payload);

      if (response) {
        setShowSuccess(true);
        setSuccessMessage({
          title: 'Pembayaran Berhasil',
          description: 'Pembayaran cash berhasil diproses',
        });

        reset();
        setStudentBill(null);
        setSelectedStudentId(null);
      }
    } catch (err: any) {
      const handled = handleApiError(err);
      setStudentsError(handled.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-1 w-full flex justify-center items-center flex-col bg-white">
      <div className="mx-auto flex flex-col gap-5 max-w-[936px] w-full h-fit pb-9">
        <form className={'flex flex-col gap-5'} onSubmit={handleSubmit(handleFormSubmit)}>
          {/* ✅ StudentSelect */}
          <StudentSelect
            value={selectedStudentId ? selectedStudentId.toString() : ''}
            onChange={handleStudentSelect}
            label="Nama Siswa"
            placeholder="Pilih siswa"
          />

          {/* ✅ Bill Detail */}
          {fetchingBill && (
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-gray-600">Memuat informasi tagihan...</p>
            </div>
          )}

          {studentBill && !fetchingBill && (
            <div className="p-4 border border-blue-300 rounded-md bg-blue-50 text-gray-700">
              <h3 className="font-semibold text-lg mb-2">Detail Tagihan</h3>
              <div className="grid grid-cols-2 gap-2">
                <p className="text-gray-600">Total Tagihan:</p>
                <p className="font-medium">Rp {studentBill.bill.toLocaleString('id-ID')}</p>

                <p className="text-gray-600">Sisa Tagihan:</p>
                <p className="font-medium">Rp {studentBill.remainBill.toLocaleString('id-ID')}</p>

                <p className="text-gray-600">Deskripsi:</p>
                <p className="font-medium">{studentBill.description}</p>
              </div>
            </div>
          )}

          {/* Input Amount */}
          <div className="flex flex-col gap-2">
            <TextInputWithLabel
              label={'Jumlah Pembayaran (Rp)'}
              id={'amount'}
              type={'number'}
              value={amount?.toString() || ''}
              onChange={handleAmountChange}
              min={0}
              max={studentBill?.remainBill || 0}
              required
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          {studentBill && amount > 0 && (
            <div className="p-3 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-700">
                Sisa tagihan setelah pembayaran: Rp{' '}
                {(studentBill.remainBill - amount).toLocaleString('id-ID')}
              </p>
            </div>
          )}

          <PrimaryButton
            text={'Proses Pembayaran'}
            type="submit"
            className={'w-full mt-5'}
            disabled={!isValid || loading || !studentBill || amount <= 0 || !!errors.amount}
          />
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" />
          Memproses pembayaran...
        </div>
      )}

      {/* Error */}
      {studentsError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" />
          {studentsError}
          <button onClick={() => setStudentsError(null)} className="ml-2">
            ×
          </button>
        </div>
      )}

      {/* Success */}
      <ConfirmationSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={successMessage.title}
        description={successMessage.description}
      />
    </div>
  );
}

export default CashPaymentPage;
