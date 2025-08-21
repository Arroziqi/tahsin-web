export enum FeeType {
  FULL_TUITION = 'FULL_TUITION',
  DOWN_PAYMENT = 'DOWN_PAYMENT',
  FINAL_INSTALLMENT = 'FINAL_INSTALLMENT',
}

export const getFeeTypeOptions = () => {
  return [
    { value: FeeType.FULL_TUITION, label: 'Uang Pangkal Penuh' },
    { value: FeeType.DOWN_PAYMENT, label: 'Uang Muka' },
    { value: FeeType.FINAL_INSTALLMENT, label: 'Cicilan Akhir' },
  ];
};

export const getFeeTypeLabel = (value: FeeType) => {
  return getFeeTypeOptions().find((opt) => opt.value === value)?.label || '';
};
