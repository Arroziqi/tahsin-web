import API from '@/lib/utils/axios';
import { EventResponse, UpdateEventRequest } from '@/common/type/event/eventModel';
import { API_ROUTES } from '@/common/const/route';

export const updateEvent = async (payload: UpdateEventRequest): Promise<EventResponse> => {
  const response = await API.patch<{ data: EventResponse }>(API_ROUTES.EVENT.UPDATE, payload);
  return response.data.data;
};
