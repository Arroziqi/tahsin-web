import { useEffect, useState } from 'react';
import API from '@/lib/utils/axios';
import { EventResponse } from '@/common/type/event/eventModel';
import { API_ROUTES } from '@/common/const/route';

const useEvents = () => {
  const [data, setData] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await API.get<{ data: EventResponse[] }>(API_ROUTES.EVENT.GET_ALL);

      if (!response.data?.data) {
        throw new Error('Data structure not as expected');
      }

      setData(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    fetchEvents();
  }, [refreshTrigger]);

  return {
    data,
    loading,
    error,
    refresh,
    setError,
  };
};

export default useEvents;
