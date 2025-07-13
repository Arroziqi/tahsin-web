export type AcademicPeriodResponse = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export type CreateAcademicPeriodRequest = {
  name: string;
  startDate: Date;
  endDate: Date;
  description?: string;
  isActive?: boolean;
};

export type UpdateAcademicPeriodRequest = {
  id: number;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  isActive?: boolean;
};
