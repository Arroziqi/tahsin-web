import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { PaymentFeeResponse } from '@/common/type/paymentFee/paymentFeeModel';

const usePaymentFees = () => {
  const [data, setData] = useState<PaymentFeeResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchPaymentFees = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: PaymentFeeResponse[] }>(
        API_ROUTES.PAYMENT_FEE.GET_ALL
      );

      setData(response.data.data);
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
    fetchPaymentFees();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default usePaymentFees;
