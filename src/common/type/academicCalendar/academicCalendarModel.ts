export type AcademicCalendarResponse = {
  id: number;
  academicPeriodId: number;
  eventId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: number;
  AcademicPeriod: {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    isActive?: boolean;
  };
  Event: {
    id: number;
    name: string;
    isActive?: boolean;
  };
};

export type CreateAcademicCalendarRequest = {
  academicPeriodId: number;
  eventId: number;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
};

export type UpdateAcademicCalendarRequest = {
  id: number;
  academicPeriodId?: number;
  eventId?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
};
