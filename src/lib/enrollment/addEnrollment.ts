import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  CreateEnrollmentRequest,
  EnrollmentResponse,
} from '@/common/type/enrollment/enrollmentModel';

export const addEnrollment = async (data: CreateEnrollmentRequest): Promise<EnrollmentResponse> => {
  const response = await API.post(API_ROUTES.ENROLLMENT.CREATE, data);

  return response.data;
};
