import { useCallback, useEffect, useState } from 'react';
import API from '@/lib/utils/axios';

export interface ScheduleResponseDataType {
  id: number;
  dayId: number;
  timeId: number;
  classType: 'ONLINE' | 'OFFLINE';
  isActive: boolean;
  createdBy: number | null;
  Day?: {
    id: number;
    day: string;
    isActive: boolean;
  };
  Time?: {
    id: number;
    session: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
  };
}

export function useSchedules() {
  const [data, setData] = useState<ScheduleResponseDataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: ScheduleResponseDataType[] }>(
        '/admin/api/schedule/getAll'
      );

      if (!response.data?.data) throw new Error('Data not found');

      setData(response.data.data);
      setError(null);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setData([]);
        setError(null); // bukan error, hanya data kosong
      } else {
        setError(err.message || 'Gagal memuat data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, setError, refetch: fetchData }; // ⬅️ expose refetch
}
