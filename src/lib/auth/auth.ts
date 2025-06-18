import API from '@/lib/utils/axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleLogin = async (
  username: string,
  password: string,
  router: AppRouterInstance
) => {
  try {
    const res = await API.post('/api/login', {
      username,
      password,
    });

    const user = res.data.data;
    localStorage.setItem('user', JSON.stringify(user));

    const token: string = res.data.data.token;
    localStorage.setItem('token', token);

    router.push('/dashboard/add-teacher');
  } catch (err: unknown) {
    console.error('Login error:', err);
    // @ts-ignore
    alert(err.response?.data?.message || 'Login gagal');
  }
};
