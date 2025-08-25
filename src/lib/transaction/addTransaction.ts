import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  CreateTransactionRequest,
  TransactionResponse,
} from '@/common/type/transactioin/transactionModel';

export const addTransaction = async (
  data: CreateTransactionRequest
): Promise<TransactionResponse> => {
  const response = await API.post(API_ROUTES.TRANSACTION.CREATE, data);

  return response.data;
};
