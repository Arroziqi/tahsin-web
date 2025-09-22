import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export async function updateSchedule({
  id,
  dayId,
  timeId,
  classType,
  isActive,
}: {
  id: number;
  dayId?: number;
  timeId?: number;
  classType?: 'ONLINE' | 'OFFLINE';
  isActive?: boolean;
}): Promise<boolean> {
  const response = await API.patch(API_ROUTES.SCHEDULE.UPDATE, {
    id,
    dayId,
    timeId,
    classType,
    isActive,
  });
  return response.status === 200;
}
