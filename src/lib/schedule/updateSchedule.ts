import API from '@/lib/utils/axios';

export async function updateSchedule({
  id,
  dayId,
  timeId,
  classType,
}: {
  id: number;
  dayId: number;
  timeId: number;
  classType: 'ONLINE' | 'OFFLINE';
}): Promise<boolean> {
  const response = await API.patch('/admin/api/schedule/update', {
    id,
    dayId,
    timeId,
    classType,
  });
  return response.status === 200;
}
