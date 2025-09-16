import { Education } from '@/common/type/enrollment/enrollmentEnum';
import { StudentStatusEnum } from '@/common/type/student/studentEnum';

export type StudentResponse = {
  id: number;
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  motivation: string;
  userId: number;
  username: string; // baru
  email: string; // baru
  levelId?: number | null;
  classId?: number | null;
  enrollmentId: number;
  studentStatus?: StudentStatusEnum | null;
  createdBy: number | null;
};

export type CreateStudentRequest = {
  fullName: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  motivation: string;
  userId: number;
  levelId?: number | null;
  classId?: number | null;
  enrollmentId: number;
  studentStatus?: StudentStatusEnum | null;
};

export type UpdateStudentRequest = {
  id: number;
  fullName?: string;
  dateOfBirth?: Date | null;
  noTelp?: string | null;
  lastEducation?: Education | null;
  levelId?: number | null;
  classId?: number | null;
  studentStatus?: StudentStatusEnum | null;
};
