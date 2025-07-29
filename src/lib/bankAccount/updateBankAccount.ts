import { BankAccountResponse } from '@/hooks/fetchData/useBankAccounts';
import API from '@/lib/utils/axios';

export type UpdateBankAccountRequest = {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isActive?: boolean;
};

export const updateBankAccount = async (
  payload: UpdateBankAccountRequest
): Promise<BankAccountResponse> => {
  const response = await API.patch<{ data: BankAccountResponse }>(
    '/admin/api/bankAccount/update',
    payload
  );
  return response.data.data;
};
