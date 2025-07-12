import API from '@/lib/utils/axios';
import { LevelResponseDataType } from '@/hooks/fetchData/useLevels';

interface UpdateLevelPayload {
  id: number;
  level?: string;
  isActive?: boolean;
}

export const updateLevel = async (payload: UpdateLevelPayload): Promise<LevelResponseDataType> => {
  const response = await API.patch<{ data: LevelResponseDataType }>(
    '/admin/api/level/update',
    payload
  );
  return response.data.data;
};
