import API from '@/lib/utils/axios';
import { DayResponseDataType } from '@/hooks/fetchData/useDays';

interface UpdateDayPayload {
  id: number;
  day?: string;
  isActive?: boolean;
}

export const updateDay = async (payload: UpdateDayPayload): Promise<DayResponseDataType> => {
  const response = await API.patch<{ data: DayResponseDataType }>('/admin/api/day/update', payload);
  return response.data.data;
};
