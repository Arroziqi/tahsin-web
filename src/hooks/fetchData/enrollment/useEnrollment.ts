'use client';

import { useEffect, useState } from 'react';
import { EnrollmentResponse } from '@/common/type/enrollment/enrollmentModel';
import { getAllEnrollment } from '@/lib/enrollment/getAllEnrollment';

const useEnrollments = () => {
  const [data, setData] = useState<EnrollmentResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await getAllEnrollment();

      setData(response);
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
    fetchEnrollments();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default useEnrollments;
