import API from '@/lib/utils/axios';

export const deleteBankAccount = async (id: number): Promise<boolean> => {
  const response = await API.delete(`/admin/api/bankAccount/delete/${id}`);
  return response.status === 200 || response.status === 204;
};
