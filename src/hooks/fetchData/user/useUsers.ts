// hooks/fetchData/useUsers.ts
import { useCallback, useEffect, useState } from 'react';
import { getAllUser } from '@/lib/user/getAllUser';
import { UserResponse } from '@/common/type/user/userModel';

export const useUsers = () => {
  const [data, setData] = useState<UserResponse[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllUser();
      setData(response);
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch users';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refresh = useCallback(() => {
    return fetchUsers();
  }, [fetchUsers]);

  return { data, loading, error, refresh };
};
