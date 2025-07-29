import API from '@/lib/utils/axios';
import { CreateEventRequest, EventResponse } from '@/common/type/event/eventModel';
import { API_ROUTES } from '@/common/const/route';

export const addEvent = async (payload: CreateEventRequest): Promise<EventResponse> => {
  const response = await API.post<{ data: EventResponse }>(API_ROUTES.EVENT.CREATE, payload);
  return response.data.data;
};
