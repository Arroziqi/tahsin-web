import API from '@/lib/utils/axios';

export const deleteLevel = async (id: number): Promise<boolean> => {
  try {
    const response = await API.delete(`/admin/api/level/delete/${id}`);
    return response.status === 200;
  } catch (err) {
    console.error('Delete Level Error:', err);
    throw err;
  }
};
