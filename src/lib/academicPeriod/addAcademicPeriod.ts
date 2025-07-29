import API from '@/lib/utils/axios';
import {
  AcademicPeriodResponse,
  CreateAcademicPeriodRequest,
} from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

export const addAcademicPeriod = async (
  payload: CreateAcademicPeriodRequest
): Promise<AcademicPeriodResponse> => {
  const response = await API.post<{ data: AcademicPeriodResponse }>(
    API_ROUTES.ACADEMIC_PERIOD.CREATE,
    payload
  );
  return response.data.data;
};
