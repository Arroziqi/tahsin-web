import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteAcademicPeriod = async (id: number): Promise<boolean> => {
  const response = await API.delete(API_ROUTES.ACADEMIC_PERIOD.DELETE(id));
  return response.status === 200;
};
