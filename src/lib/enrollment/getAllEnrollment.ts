import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { EnrollmentResponse } from '@/common/type/enrollment/enrollmentModel';

export const getAllEnrollment = async (): Promise<EnrollmentResponse[] | []> => {
  try {
    const response = await API.get<{ data: EnrollmentResponse[] }>(API_ROUTES.ENROLLMENT.GET_ALL);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
