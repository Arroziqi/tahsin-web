import { FeeType } from '@/common/type/paymentFee/paymentFeeTypeEnum';

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
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
  createdBy: number | null;
};

export type CreateTransactionRequest = {
  bankAccountId?: number | null;
  billId: number;
  transactionType: FeeType;
  transactionStatus: TransactionStatusEnum;
  amount: number;
};

export type UpdateTransactionRequest = {
  id: number;
  bankAccountId?: number | null;
  billId?: number;
  transactionType?: FeeType;
  transactionStatus?: TransactionStatusEnum;
  amount: number;
};
