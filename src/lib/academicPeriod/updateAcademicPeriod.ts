import API from '@/lib/utils/axios';
import {
  AcademicPeriodResponse,
  UpdateAcademicPeriodRequest,
} from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

export const updateAcademicPeriod = async (
  payload: UpdateAcademicPeriodRequest
): Promise<AcademicPeriodResponse> => {
  try {
    const response = await API.patch<{ data: AcademicPeriodResponse }>(
      API_ROUTES.ACADEMIC_PERIOD.UPDATE,
      payload
    );
    return response.data.data;
  } catch (err: any) {
    console.error('Update academic period error:', err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'Failed to update academic period');
  }
};
