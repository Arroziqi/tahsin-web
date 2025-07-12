import API from '@/lib/utils/axios';
import { TimeResponseDataType } from '@/hooks/fetchData/useTimes';

interface UpdateTimePayload {
  id: number;
  session?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
}

export const updateTime = async (payload: UpdateTimePayload): Promise<TimeResponseDataType> => {
  const response = await API.patch<{ data: TimeResponseDataType }>(
    '/admin/api/time/update',
    payload
  );
  return response.data.data;
};
