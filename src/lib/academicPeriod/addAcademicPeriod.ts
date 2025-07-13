import API from '@/lib/utils/axios';
import {
  AcademicPeriodResponse,
  CreateAcademicPeriodRequest,
} from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

export const addAcademicPeriod = async (
  payload: CreateAcademicPeriodRequest
): Promise<AcademicPeriodResponse> => {
  try {
    const response = await API.post<{ data: AcademicPeriodResponse }>(
      API_ROUTES.ACADEMIC_PERIOD.CREATE,
      payload
    );
    return response.data.data;
  } catch (err: any) {
    console.error('Add academic period error:', err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'Failed to add academic period');
  }
};
