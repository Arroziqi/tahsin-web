import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteAcademicPeriod = async (id: number): Promise<boolean> => {
  try {
    const response = await API.delete(API_ROUTES.ACADEMIC_PERIOD.DELETE(id));
    return response.status === 200;
  } catch (err: any) {
    console.error('Delete academic period error:', err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'Failed to delete academic period');
  }
};
