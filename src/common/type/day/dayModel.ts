export type DayResponse = {
  id: number;
  day: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateDayRequest = {
  day: string;
  isActive?: boolean;
};

export type UpdateDayRequest = {
  id: number;
  day: string;
  isActive?: boolean;
};
