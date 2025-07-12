import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export interface DayResponseDataType {
  id: number;
  day: string;
  status?: string;
}

const useDays = () => {
  const [data, setData] = useState<DayResponseDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchDays = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: any[] }>('/admin/api/day/getAll');

      if (!response.data?.data) {
        throw new Error('Data structure not as expected');
      }

      const transformedData = response.data.data.map((day: any) => ({
        id: day.id,
        day: day.day,
        status: day.isActive ? 'Aktif' : 'Non Aktif',
      }));

      setData(transformedData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch day data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchDays();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};

export default useDays;
