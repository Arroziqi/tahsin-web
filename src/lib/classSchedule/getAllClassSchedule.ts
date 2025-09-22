import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { ClassScheduleResponse } from '@/common/type/classSchedule/classScheduleModel';
import { Helper } from '@/lib/utils/helper';

export const getAllCLassSchedules = async (): Promise<ClassScheduleResponse[]> => {
  try {
    const response = await API.get<{ data: ClassScheduleResponse[] }>(
      API_ROUTES.CLASS_SCHEDULE.GET_ALL
    );

    return response.data.data.map((item) => {
      const session = item.Schedule?.Time?.session ?? '';
      const start = Helper.minutesToHHMM(Number(item.Schedule?.Time?.startTime ?? undefined));
      const end = Helper.minutesToHHMM(Number(item.Schedule?.Time?.endTime ?? undefined));

      return {
        ...item,
        Schedule: item.Schedule
          ? {
              ...item.Schedule,
              flattenedDay: item.Schedule.Day?.day ?? '',
              flattenedSession: start && end ? `${session} (${start}–${end})` : session,
            }
          : null,
      };
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
