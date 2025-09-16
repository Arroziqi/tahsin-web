import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { StudentResponse, UpdateStudentRequest } from '@/common/type/student/studentModel';

export const updateStudent: (data: UpdateStudentRequest) => Promise<StudentResponse> = async (
  data: UpdateStudentRequest
): Promise<StudentResponse> => {
  const response = await API.patch(API_ROUTES.STUDENT.UPDATE, data);
  return response.data;
};
