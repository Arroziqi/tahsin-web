import API from '@/lib/utils/axios';
import { CreateEventRequest, EventResponse } from '@/common/type/event/eventModel';
import { API_ROUTES } from '@/common/const/route';

export const addEvent = async (payload: CreateEventRequest): Promise<EventResponse> => {
  try {
    const response = await API.post<{ data: EventResponse }>(API_ROUTES.EVENT.CREATE, payload);
    return response.data.data;
  } catch (err: any) {
    console.error('Add Event Error:', err);

    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    } else if (err.response?.data?.errors) {
      const errorMessages = Object.values(err.response.data.errors).join('\n');
      throw new Error(errorMessages);
    } else {
      throw new Error(err.message || 'Failed to add event');
    }
  }
};
