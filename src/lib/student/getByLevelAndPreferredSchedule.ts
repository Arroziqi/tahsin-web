// lib/student/getByLevelAndPreferredSchedule.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { StudentResponse } from '@/common/type/student/studentModel';

/**
 * Get students filtered by levelId and/or preferredScheduleId
 * @param levelId optional level id
 * @param preferredScheduleId optional preferred schedule id
 * @returns Promise<StudentResponse[]> (empty array if error)
 */
export const getByLevelAndPreferredSchedule = async (
  levelId?: number,
  preferredScheduleId?: number
): Promise<StudentResponse[]> => {
  try {
    const params: Record<string, number> = {};
    if (levelId !== undefined) params.levelId = levelId;
    if (preferredScheduleId !== undefined) params.classScheduleId = preferredScheduleId;

    const response = await API.get<{ data: StudentResponse[] }>(
      API_ROUTES.STUDENT.GET_BY_LEVEL_AND_PREFERRED_SCHEDULE,
      {
        params,
      }
    );

    return response.data.data;
  } catch (error) {
    console.error('Error fetching students by level/schedule:', error);
    return [];
  }
};
