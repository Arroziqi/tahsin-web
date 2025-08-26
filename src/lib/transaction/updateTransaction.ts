import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  TransactionResponse,
  UpdateTransactionRequest,
} from '@/common/type/transactioin/transactionModel';

export const updateTransaction: (
  data: UpdateTransactionRequest
) => Promise<TransactionResponse> = async (
  data: UpdateTransactionRequest
): Promise<TransactionResponse> => {
  const response = await API.patch(API_ROUTES.TRANSACTION.UPDATE, data);
  return response.data;
};
