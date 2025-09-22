import { useCallback, useEffect, useState } from 'react';
import { getAssignedInPreferredSchedule } from '@/lib/schedule/getAssignedInPreferredSchedule';
import { ScheduleResponseDataType } from '@/common/type/schedule/scheduleModel';

const useAssignedInPreferredSchedule = () => {
  const [data, setData] = useState<ScheduleResponseDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const rawData = await getAssignedInPreferredSchedule();

      const transformed: ScheduleResponseDataType[] = rawData.map((item) => ({
        ...item,
        flattenedDay: item.Day?.day ?? '',
        flattenedSession: item.Time?.session ?? '',
      }));

      setData(transformed);
      setError(null);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = () => setRefreshTrigger((prev) => prev + 1);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
  };
};

export default useAssignedInPreferredSchedule;
