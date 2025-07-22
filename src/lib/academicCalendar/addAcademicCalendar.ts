import {
  AcademicCalendarResponse,
  CreateAcademicCalendarRequest,
} from '@/common/type/academicCalendar/academicCalendarModel';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const addAcademicCalendar = async (
  data: CreateAcademicCalendarRequest
): Promise<AcademicCalendarResponse> => {
  try {
    const response = await API.post(API_ROUTES.ACADEMIC_CALENDAR.CREATE, data);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message);
  }
};
