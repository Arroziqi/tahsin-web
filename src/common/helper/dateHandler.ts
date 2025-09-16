export class DateHandler {
  static formatDateForInput(value?: string | Date | null): string {
    if (!value) return '';

    if (value instanceof Date) {
      // kalau sudah Date object, tinggal format YYYY-MM-DD
      return value.toISOString().split('T')[0];
    }

    // kalau string, pastikan dia valid ISO/tanggal
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      // kalau string bukan tanggal valid, balikin string kosong
      return '';
    }
    return date.toISOString().split('T')[0];
  }
}
