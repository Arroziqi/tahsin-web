import API from '@/lib/utils/axios';

export const deleteLevel = async (id: number): Promise<boolean> => {
  const response = await API.delete(`/admin/api/level/delete/${id}`);
  return response.status === 200;
};
