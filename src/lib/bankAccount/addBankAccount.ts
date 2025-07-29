import { BankAccountResponse } from '@/hooks/fetchData/useBankAccounts';
import API from '@/lib/utils/axios';

export type CreateBankAccountRequest = {
  accountName: string;
  accountNumber: string;
  bankName: string;
};

export const addBankAccount = async (
  payload: CreateBankAccountRequest
): Promise<BankAccountResponse> => {
  const response = await API.post<{ data: BankAccountResponse }>(
    '/admin/api/bankAccount/create',
    payload
  );
  return response.data.data;
};
