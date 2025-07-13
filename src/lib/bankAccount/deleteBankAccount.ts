import API from '@/lib/utils/axios';

export const deleteBankAccount = async (id: number): Promise<boolean> => {
  try {
    // Adjust this endpoint if your delete endpoint is different
    const response = await API.delete(`/admin/api/bankAccount/delete/${id}`);
    return response.status === 200 || response.status === 204;
  } catch (err) {
    console.error('Delete Bank Account Error:', err);
    throw err;
  }
};
