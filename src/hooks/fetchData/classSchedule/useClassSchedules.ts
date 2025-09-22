// hooks/useClassSchedules.ts
import { useEffect, useState } from 'react';
import { ClassScheduleResponse } from '@/common/type/classSchedule/classScheduleModel';
import { getAllCLassSchedules } from '@/lib/classSchedule/getAllClassSchedule';
import { handleApiError } from '@/lib/utils/errorHandler';

export function useClassSchedules() {
  const [data, setData] = useState<ClassScheduleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllCLassSchedules();

      setData(result);
    } catch (err) {
      console.error('Fetch error:', err);
      const handledError = handleApiError(err);
      setError(handledError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassSchedules();
  }, []);

  return { data, loading, error, refetch: fetchClassSchedules };
}
