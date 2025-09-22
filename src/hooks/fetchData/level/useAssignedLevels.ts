// hooks/useAssignedLevels.ts
import { useEffect, useState } from 'react';
import { getAssignedLevels } from '@/lib/level/getAssignedLevels';
import { LevelResponse } from '@/common/type/level/levelModel';

const useAssignedLevels = () => {
  const [data, setData] = useState<LevelResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchAssignedLevels = async () => {
    try {
      setLoading(true);
      const response = await getAssignedLevels();

      // jika butuh transform data (misalnya ubah isActive ke string):
      const transformed = response.map((lvl) => ({
        ...lvl,
        isActive: lvl.isActive ?? false,
      }));

      setData(transformed);
      setError(null);
    } catch (err) {
      console.error('Fetch assigned levels error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch assigned levels');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    fetchAssignedLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};

export default useAssignedLevels;
