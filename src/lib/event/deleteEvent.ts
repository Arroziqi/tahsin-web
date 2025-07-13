import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteEvent = async (id: number): Promise<boolean> => {
  try {
    const response = await API.delete(API_ROUTES.EVENT.DELETE(id));
    return response.status === 200;
  } catch (err: any) {
    console.error('Delete Event Error:', err);

    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else if (err.response?.status === 400) {
      throw new Error('Cannot delete event that is already used in another record');
    } else {
      throw new Error(err.message || 'Failed to delete event');
    }
  }
};
