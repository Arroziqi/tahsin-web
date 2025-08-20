import API from '@/lib/utils/axios';
import { AcademicPeriodResponse } from '@/common/type/academicPeriod/academicPeriodModel';
import { API_ROUTES } from '@/common/const/route';

export const getActiveAcademicPeriod = async (): Promise<AcademicPeriodResponse | null> => {
  try {
    const response = await API.get<{ data: AcademicPeriodResponse[] }>(
      API_ROUTES.ACADEMIC_PERIOD.GET_ALL
    );

    // Filter for active academic periods
    const activePeriods = response.data.data.filter((period) => period.isActive);

    // Return the first active period (or null if none found)
    // You might want to add additional logic if multiple active periods are possible
    return activePeriods.length > 0 ? activePeriods[0] : null;
  } catch (error) {
    console.error('Error fetching active academic period:', error);
    return null;
  }
};
