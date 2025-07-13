import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export type BankAccountResponse = {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  isActive?: boolean;
  createdBy: number | null;
};

const useBankAccounts = () => {
  const [data, setData] = useState<BankAccountResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchBankAccounts = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: BankAccountResponse[] }>(
        '/admin/api/bankAccount/getAll'
      );

      if (!response.data?.data) {
        throw new Error('Data structure not as expected');
      }

      setData(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch bank account data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchBankAccounts();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    setError,
    refresh,
  };
};

export default useBankAccounts;
