export type TimeResponse = {
  id: number;
  session: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateTimeRequest = {
  session: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
};

export type UpdateTimeRequest = {
  id?: number;
  session?: string;
  startTime?: string;
  endTime?: string;
  isActive?: boolean;
};
