import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { TransactionResponse } from '@/common/type/transactioin/transactionModel';

export const getAllTransaction = async (): Promise<TransactionResponse[] | []> => {
  try {
    const response = await API.get<{ data: TransactionResponse[] }>(API_ROUTES.TRANSACTION.GET_ALL);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
