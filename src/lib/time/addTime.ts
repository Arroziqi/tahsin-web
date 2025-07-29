import API from '@/lib/utils/axios';

interface AddTimeInput {
  session: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
}

export const addTime = async (payload: AddTimeInput): Promise<boolean> => {
  const response = await API.post('/admin/api/time/create', payload);
  return response.status === 201 || response.status === 200;
};
