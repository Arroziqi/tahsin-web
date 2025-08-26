import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import {
  EnrollmentResponse,
  UpdateEnrollmentRequest,
} from '@/common/type/enrollment/enrollmentModel';

export const updateEnrollment: (
  data: UpdateEnrollmentRequest
) => Promise<EnrollmentResponse> = async (
  data: UpdateEnrollmentRequest
): Promise<EnrollmentResponse> => {
  const response = await API.patch(API_ROUTES.ENROLLMENT.UPDATE, data);
  return response.data;
};
