import API from '@/lib/utils/axios';

interface AddDayInput {
  day: string;
  isActive?: boolean;
}

export const addDay = async (payload: AddDayInput): Promise<boolean> => {
  const response = await API.post('/admin/api/day/create', payload);
  return response.status === 201 || response.status === 200;
};
