import API from '@/lib/utils/axios';
import { API_ROUTES } from '@/common/const/route';
import { BillResponse } from '@/common/type/bill/billModel';

export const getBillByStudentId = async (id: number): Promise<BillResponse> => {
  const response = await API.get(API_ROUTES.BILL.GET_BY_STUDENT_ID(id));

  return response.data.data;
};
