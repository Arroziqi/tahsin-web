import API from '@/lib/utils/axios';

interface AddLevelInput {
  level: string;
  isActive?: boolean;
}

export const addLevel = async (payload: AddLevelInput): Promise<boolean> => {
  try {
    const response = await API.post('/admin/api/level/create', payload);
    return response.status === 201 || response.status === 200;
  } catch (err) {
    console.error('Add Level Error:', err);
    throw err;
  }
};
