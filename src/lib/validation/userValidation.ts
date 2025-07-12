export const validateUsername = (val: string): string | null => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(val)) return 'Hanya boleh huruf dan angka';
  if (val.length < 5) return 'Minimal 5 karakter';
  if (val.length > 10) return 'Maksimal 10 karakter';
  return null;
};

export const validatePassword = (val: string): string | null => {
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /[0-9]/.test(val);

  if (!hasLetter || !hasNumber) return 'Password harus mengandung huruf dan angka';
  if (val.length !== 8) return 'Password harus 8 karakter';

  return null;
};

export const validateConfirmPassword = (password: string, confirm: string): string | null => {
  if (password !== confirm) return 'Konfirmasi password harus sama';
  return null;
};
