import { ClassType, Education, Program } from '@/common/type/enrollment/enrollmentEnum';
import { ScheduleResponseShort } from '@/common/type/schedule/scheduleModel';

export type EnrollmentResponse = {
  id: number;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date | string;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudyId: number;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
  createdBy: number | null;

  Schedule?: ScheduleResponseShort;
};

export type CreateEnrollmentRequest = {
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date | string;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudyId: number;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  studentId?: number;
  classId?: number | null;
};

export type RegisterEnrollmentRequest = {
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date | string;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudyId: number;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId: number;
  classId?: number | null;
};

export type UpdateEnrollmentRequest = {
  id: number;
  // username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date | string;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudyId: number;
  voiceRecording?: string;
  dateOfReservation?: Date | string;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
};
