import { FeeType } from '@/common/type/paymentFee/paymentFeeTypeEnum';
import { BillResponse } from '@/common/type/bill/billModel';
import { StudentResponse } from '@/common/type/student/studentModel';

export enum TransactionStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export type TransactionResponse = {
  id: number;
  bankAccountId?: number | null;
  billId: number;
  studentId?: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
  createdBy: number | null;
  createdAt?: Date | null;
  Bill?: BillResponse;
  Student?: StudentResponse;
};

export type CreateTransactionRequest = {
  bankAccountId?: number | null;
  billId: number;
  studentId?: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
};

export type UpdateTransactionRequest = {
  id: number;
  studentId?: number;
  bankAccountId?: number | null;
  billId?: number;
  transactionType?: FeeType;
  transactionStatus?: TransactionStatusEnum;
  amount: number;
};
