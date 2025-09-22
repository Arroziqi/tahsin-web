// lib/schedule/getAssignedPreferred.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { ScheduleResponse } from '@/common/type/schedule/scheduleModel';

/**
 * Get all schedules that are already assigned in student's preferred schedule
 * @returns Promise<ScheduleResponse[]> (empty array if error)
 */
export const getAssignedInPreferredSchedule = async (): Promise<ScheduleResponse[]> => {
  try {
    const response = await API.get<{ data: ScheduleResponse[] }>(
      API_ROUTES.SCHEDULE.GET_ASSIGNED_IN_PREFERRED
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching assigned preferred schedules:', error);
    return [];
  }
};
