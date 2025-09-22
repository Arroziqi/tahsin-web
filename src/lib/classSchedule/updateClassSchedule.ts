// src/lib/classSchedule/updateClassSchedule.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  ClassScheduleResponse,
  UpdateClassScheduleRequest,
} from '@/common/type/classSchedule/classScheduleModel';

export const updateClassSchedule = async (
  data: UpdateClassScheduleRequest
): Promise<ClassScheduleResponse> => {
  const response = await API.patch(API_ROUTES.CLASS_SCHEDULE.UPDATE, data);
  return response.data;
};
