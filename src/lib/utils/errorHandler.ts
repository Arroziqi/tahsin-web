import { AxiosError } from 'axios';

export function handleApiError(err: unknown): { message: string } {
  if (err instanceof AxiosError) {
    const data = err.response?.data;

    // Kalau ada array details
    const details = data?.errors?.details;
    if (Array.isArray(details) && details.length > 0) {
      return { message: details.map((d: any) => d.message).join(', ') };
    }

    // Kalau ada generic di errors
    if (data?.errors?.message) {
      return { message: data.errors.message };
    }

    // Kalau ada message langsung di root
    if (data?.message) {
      return { message: data.message };
    }
  }

  return { message: 'Terjadi kesalahan. Silakan coba lagi.' };
}
