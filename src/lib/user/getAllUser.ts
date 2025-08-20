import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { UserResponse } from '@/common/type/user/userModel';

export const getAllUser = async (): Promise<UserResponse[] | []> => {
  try {
    const response = await API.get<{ data: UserResponse[] }>(API_ROUTES.USER.GET_ALL);

    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
