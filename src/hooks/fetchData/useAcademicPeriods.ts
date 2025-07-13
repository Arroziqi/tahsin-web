import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';
import { AcademicPeriodResponse } from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

const useAcademicPeriods = () => {
  const [data, setData] = useState<AcademicPeriodResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchAcademicPeriods = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: AcademicPeriodResponse[] }>(
        API_ROUTES.ACADEMIC_PERIOD.GET_ALL
      );

      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch academic periods');
    } finally {
      setLoading(false);
    }
  };

  const createAcademicPeriod = async (payload: {
    name: string;
    startDate: Date;
    endDate: Date;
    description?: string;
    isActive?: boolean;
  }) => {
    try {
      setLoading(true);
      const response = await API.post<{ data: AcademicPeriodResponse }>(
        '/academic-periods',
        payload
      );
      setData((prev) => [...prev, response.data.data]);
      return { success: true, message: 'Academic period created successfully' };
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchAcademicPeriods();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    createAcademicPeriod,
    setError,
  };
};

export default useAcademicPeriods;
