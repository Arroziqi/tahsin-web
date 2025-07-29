import { FeeType } from '@/common/type/paymentFee/paymentFeeTypeEnum';

export type PaymentFeeResponse = {
  id: number;
  academicPeriodId: number;
  feeType: FeeType;
  amount: number;
  description?: string | null;
  dueDate: Date;
  isInvoiced: boolean;
  createdAt?: Date | null;
  AcademicPeriod: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  };
};

export type CreatePaymentFeeRequest = {
  academicPeriodId: number;
  feeType: FeeType;
  amount: number;
  description?: string;
  dueDate: Date;
};

export type UpdatePaymentFeeRequest = {
  id: number;
  academicPeriodId?: number;
  feeType?: FeeType;
  amount?: number;
  description?: string;
  dueDate?: Date;
  isInvoiced?: boolean;
};
