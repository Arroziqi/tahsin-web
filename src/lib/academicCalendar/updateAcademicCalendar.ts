import {
  AcademicCalendarResponse,
  UpdateAcademicCalendarRequest,
} from '@/common/type/academicCalendar/academicCalendarModel';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const updateAcademicCalendar = async (
  data: UpdateAcademicCalendarRequest
): Promise<AcademicCalendarResponse> => {
  const response = await API.patch(API_ROUTES.ACADEMIC_CALENDAR.UPDATE, data);
  return response.data;
};
