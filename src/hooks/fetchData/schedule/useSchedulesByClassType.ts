// hooks/fetchData/schedule/useSchedulesByClassType.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { ClassType } from '@/common/type/enrollment/enrollmentEnum';
import { ScheduleResponse, ScheduleResponseDataType } from '@/common/type/schedule/scheduleModel';
import { getSchedulesByClassType } from '@/lib/schedule/getByClassType';

/**
 * Hook untuk mengambil jadwal berdasarkan ClassType
 * Hasil yang dikembalikan sudah dalam bentuk ScheduleResponseDataType
 */
export const useSchedulesByClassType = (classType?: ClassType) => {
  const [data, setData] = useState<ScheduleResponseDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchSchedules = useCallback(async () => {
    if (!classType) {
      setData([]);
      return;
    }
    setLoading(true);
    try {
      const rawData: ScheduleResponse[] = await getSchedulesByClassType(classType);

      // Transform supaya ada flattenedDay & flattenedSession
      const transformed: ScheduleResponseDataType[] = rawData.map((item) => ({
        ...item,
        flattenedDay: item.Day?.day ?? '',
        flattenedSession: item.Time?.session ?? '',
      }));

      setData(transformed);
      setError(null);
    } catch (err) {
      console.error('Error fetch schedules by classType:', err);
      setError('Gagal memuat jadwal');
    } finally {
      setLoading(false);
    }
  }, [classType]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules, refreshTrigger]);

  return {
    data,
    loading,
    error,
    refetch: () => setRefreshTrigger((prev) => prev + 1),
  };
};
