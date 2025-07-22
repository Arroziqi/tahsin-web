import { AcademicCalendarResponse } from '@/common/type/academicCalendar/academicCalendarModel';
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';

export const deleteAcademicCalendar = async (id: number): Promise<AcademicCalendarResponse> => {
  try {
    const response = await API.delete(API_ROUTES.ACADEMIC_CALENDAR.DELETE(id));
    return response.data;
  } catch (err: any) {
    console.error('Delete academic calendar error:', err);
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message || 'Failed to delete academic calendar');
  }
};
