import { AcademicCalendarResponse } from '@/common/type/academicCalendar/academicCalendarModel';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteAcademicCalendar = async (id: number): Promise<AcademicCalendarResponse> => {
  const response = await API.delete(API_ROUTES.ACADEMIC_CALENDAR.DELETE(id));
  return response.data;
};
