import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  PaymentFeeResponse,
  UpdatePaymentFeeRequest,
} from '@/common/type/paymentFee/paymentFeeModel';

export const updatePaymentFee: (
  data: UpdatePaymentFeeRequest
) => Promise<PaymentFeeResponse> = async (
  data: UpdatePaymentFeeRequest
): Promise<PaymentFeeResponse> => {
  const response = await API.patch(API_ROUTES.PAYMENT_FEE.UPDATE, data);
  return response.data;
};
