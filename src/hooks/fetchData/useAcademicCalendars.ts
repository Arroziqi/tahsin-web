import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';
import { AcademicCalendarResponse } from '@/common/type/academicCalendar/academicCalendarModel';
import { API_ROUTES } from '@/common/const/route';

const useAcademicCalendars = () => {
  const [data, setData] = useState<AcademicCalendarResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchAcademicCalendars = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: AcademicCalendarResponse[] }>(
        API_ROUTES.ACADEMIC_CALENDAR.GET_ALL
      );

      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch academic calendars');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchAcademicCalendars();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default useAcademicCalendars;
