export enum FeeType {
  FULL_TUITION = 'full_tuition',
  DOWN_PAYMENT = 'down_payment',
  FINAL_INSTALLMENT = 'final_installment',
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
