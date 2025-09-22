// lib/classSchedule/addClassSchedule.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  ClassScheduleResponse,
  CreateClassScheduleRequest,
} from '@/common/type/classSchedule/classScheduleModel';

export const addClassSchedule = async (
  data: CreateClassScheduleRequest
): Promise<ClassScheduleResponse> => {
  const response = await API.post(API_ROUTES.CLASS_SCHEDULE.CREATE, data);
  return response.data;
};
