import {
  ClassType,
  Education,
  Program,
  TimeOfStudy,
} from '@/common/type/enrollment/enrollmentEnum';

export type EnrollmentResponse = {
  id: number;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
  createdBy: number | null;
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
  timeOfStudy: TimeOfStudy;
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
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId: number;
  classId?: number | null;
};

export type UpdateEnrollmentRequest = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  motivation: string;
  dateOfBirth: Date;
  noTelp: string;
  lastEducation: Education;
  program: Program;
  classType: ClassType;
  timeOfStudy: TimeOfStudy;
  voiceRecording?: string;
  dateOfReservation?: Date;
  academicPeriodId: number;
  userId?: number;
  classId?: number | null;
};
