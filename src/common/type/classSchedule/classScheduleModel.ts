import { ScheduleResponseDataType } from '@/common/type/schedule/scheduleModel';
import { LevelResponse } from '@/common/type/level/levelModel';
import { TeacherResponse } from '@/common/type/teacher/teacherModel';

export enum ClassScheduleStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export type ClassScheduleResponse = {
  id: number;
  name: string;
  levelId: number;
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  teacherId: number;
  capacity?: number | null;
  isActive: boolean;
  status?: ClassScheduleStatus;
  createdAt?: Date | null;

  Level?: LevelResponse | null;
  Schedule?: ScheduleResponseDataType | null;
  Teacher?: TeacherResponse | null;
};

export type CreateClassScheduleRequest = {
  name: string;
  levelId: number;
  scheduleId: number;
  startDate: Date;
  endDate: Date;
  teacherId: number;
  capacity?: number;
};

export type UpdateClassScheduleRequest = {
  id: number;
  name?: string;
  levelId?: number;
  scheduleId?: number;
  startDate?: Date;
  endDate?: Date;
  teacherId?: number;
  capacity?: number;
  isActive?: boolean;
  status?: ClassScheduleStatus;
};
