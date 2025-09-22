// lib/schedule/getSchedulesByClassType.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { ScheduleResponse } from '@/common/type/schedule/scheduleModel';
import { ClassType } from '@/common/type/enrollment/enrollmentEnum';

/**
 * Get all schedules by classType
 * @param classType ClassType (enum)
 * @returns Promise<ScheduleResponse[]> (empty array jika error)
 */
export const getSchedulesByClassType = async (
  classType: ClassType
): Promise<ScheduleResponse[]> => {
  try {
    const response = await API.get<{ data: ScheduleResponse[] }>(
      API_ROUTES.SCHEDULE.GET_BY_CLASS_TYPE(classType)
    );

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching schedules by classType (${classType}):`, error);
    return [];
  }
};
