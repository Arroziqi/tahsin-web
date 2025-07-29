import { AxiosError } from 'axios';

export function handleApiError(err: unknown): { message: string } {
  if (err instanceof AxiosError) {
    const details = err.response?.data?.errors?.details;
    const generic = err.response?.data?.errors?.message;

    if (Array.isArray(details) && details.length > 0) {
      const messages = details.map((d: any) => d.message).join(', ');
      return { message: messages };
    }

    if (generic) {
      return { message: generic };
    }
  }

  return { message: 'Terjadi kesalahan. Silakan coba lagi.' };
}
