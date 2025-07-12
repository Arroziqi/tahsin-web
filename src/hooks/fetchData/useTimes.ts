import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export interface TimeResponseDataType {
  id: number;
  session: string;
  startTime: string;
  endTime: string;
  status?: string;
}

const useTimes = () => {
  const [data, setData] = useState<TimeResponseDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchTimes = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: any[] }>('/admin/api/time/getAll');

      if (!response.data?.data) {
        throw new Error('Data structure not as expected');
      }

      const transformedData = response.data.data.map((time: any) => ({
        id: time.id,
        session: time.session,
        startTime: time.startTime,
        endTime: time.endTime,
        status: time.isActive ? 'Aktif' : 'Non Aktif',
      }));

      setData(transformedData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch time data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchTimes();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};

export default useTimes;
