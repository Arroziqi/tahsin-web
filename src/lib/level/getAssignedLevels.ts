// lib/level/getAssignedLevels.ts
import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { LevelResponse } from '@/common/type/level/levelModel';

/**
 * Get all levels that have been assigned to at least one student
 * @returns Promise<LevelResponse[]> (empty array if error)
 */
export const getAssignedLevels = async (): Promise<LevelResponse[]> => {
  try {
    const response = await API.get<{ data: LevelResponse[] }>(API_ROUTES.LEVEL.GET_ASSIGNED);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching assigned levels:', error);
    return [];
  }
};
