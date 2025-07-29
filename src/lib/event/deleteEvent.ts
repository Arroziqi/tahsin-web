import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteEvent = async (id: number): Promise<boolean> => {
  const response = await API.delete(API_ROUTES.EVENT.DELETE(id));
  return response.status === 200;
};
