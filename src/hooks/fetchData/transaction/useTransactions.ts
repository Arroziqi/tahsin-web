import { useEffect, useState } from 'react';
import { TransactionResponse } from '@/common/type/transactioin/transactionModel';
import { getAllTransaction } from '@/lib/transaction/getAllTransaction';

const useTransactions = () => {
  const [data, setData] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getAllTransaction();

      setData(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default useTransactions;
