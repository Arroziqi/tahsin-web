export type BillResponse = {
  id: number;
  bill: number;
  studentId: number;
  remainBill: number;
  description?: string | null;
  createdBy: number | null;
};

export type CreateBillRequest = {
  bill: number;
  studentId: number;
  remainBill: number;
  description?: string | null;
};

export type UpdateBillRequest = {
  id: number;
  bill?: number;
  studentId?: number;
  remainBill?: number;
  description?: string | null;
};
