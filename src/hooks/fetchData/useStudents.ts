import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { StudentResponse } from '@/common/type/student/studentModel';

const useStudents = () => {
  const [data, setData] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: StudentResponse[] }>(API_ROUTES.STUDENT.GET_ALL);

      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default useStudents;
