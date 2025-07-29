import API from '@/lib/utils/axios';
import {
  AcademicPeriodResponse,
  UpdateAcademicPeriodRequest,
} from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

export const updateAcademicPeriod = async (
  payload: UpdateAcademicPeriodRequest
): Promise<AcademicPeriodResponse> => {
  const response = await API.patch<{ data: AcademicPeriodResponse }>(
    API_ROUTES.ACADEMIC_PERIOD.UPDATE,
    payload
  );
  return response.data.data;
};
