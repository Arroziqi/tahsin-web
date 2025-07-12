import API from '@/lib/utils/axios';
import { TeacherResponseDataType } from '@/hooks/fetchData/useTeachers';

interface UpdateTeacherPayload {
  id: number;
  username?: string;
  name?: string;
  email?: string;
  noTelp?: string;
  status?: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
}

export const updateTeacher = async (
  payload: UpdateTeacherPayload
): Promise<TeacherResponseDataType> => {
  const response = await API.patch<{ data: TeacherResponseDataType }>(
    '/admin/api/teacher/update',
    payload
  );
  return response.data.data;
};
