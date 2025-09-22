import { ClassType } from '@/common/type/enrollment/enrollmentEnum';
import { DayResponse } from '@/common/type/day/dayModel';
import { TimeResponse } from '@/common/type/time/timeModel';

export interface ScheduleResponseDataType {
  id: number;
  dayId: number;
  timeId: number;
  classType: ClassType;
  isActive?: boolean;
  createdBy: number | null;
  Day?: Partial<DayResponse>;
  Time?: Partial<TimeResponse>;
  flattenedDay?: string;
  flattenedSession?: string;
}

export type ScheduleResponse = {
  id: number;
  dayId: number;
  timeId: number;
  classType: ClassType;
  isActive?: boolean;

  createdBy: number | null;
  Day?: Partial<DayResponse>;
  Time?: Partial<TimeResponse>;
};

export type ScheduleResponseShort = {
  id: number;
  day: string;
  session: string;
};

export type CreateScheduleRequest = {
  dayId: number;
  timeId: number;
  classType: ClassType;
};

export type UpdateScheduleRequest = {
  id: number;
  dayId?: number;
  timeId?: number;
  classType?: ClassType;
  isActive?: boolean;
};
