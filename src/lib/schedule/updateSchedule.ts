import API from '@/lib/utils/axios';

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
  const response = await API.patch('/admin/api/schedule/update', {
    id,
    dayId,
    timeId,
    classType,
    isActive,
  });
  return response.status === 200;
}
