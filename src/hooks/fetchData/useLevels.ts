import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export interface LevelResponseDataType {
  id: number;
  level: string;
  isActive?: string;
}

const useLevels = () => {
  const [data, setData] = useState<LevelResponseDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: any[] }>('/admin/api/level/getAll');

      if (!response.data?.data) {
        throw new Error('Data structure not as expected');
      }

      const transformedData = response.data.data.map((level: LevelResponseDataType) => ({
        id: level.id,
        level: level.level,
        isActive: level.isActive ? 'Aktif' : 'Tidak Aktif',
      }));

      setData(transformedData);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch level data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchLevels();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};

export default useLevels;
