import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { PaymentFeeResponse } from '@/common/type/paymentFee/paymentFeeModel';

export const deletePaymentFee: (id: number) => Promise<PaymentFeeResponse> = async (
  id: number
): Promise<PaymentFeeResponse> => {
  const response = await API.delete(API_ROUTES.PAYMENT_FEE.DELETE(id));
  return response.data;
};
