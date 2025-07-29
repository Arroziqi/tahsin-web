import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  CreatePaymentFeeRequest,
  PaymentFeeResponse,
} from '@/common/type/paymentFee/paymentFeeModel';

export const addPaymentFee = async (data: CreatePaymentFeeRequest): Promise<PaymentFeeResponse> => {
  const response = await API.post(API_ROUTES.PAYMENT_FEE.CREATE, data);

  return response.data;
};
