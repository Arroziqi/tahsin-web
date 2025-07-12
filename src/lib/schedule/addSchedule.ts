import API from '@/lib/utils/axios';

export async function addSchedule({
  dayId,
  timeId,
  classType,
}: {
  dayId: number;
  timeId: number;
  classType: 'ONLINE' | 'OFFLINE';
}): Promise<boolean> {
  const response = await API.post('/admin/api/schedule/create', {
    dayId,
    timeId,
    classType,
  });
  return response.status === 201 || response.status === 200;
}
