export type TeacherStatus = 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';

export type TeacherResponse = {
  id: number;
  name: string;
  nip?: string | null;
  noTelp: string;
  status: TeacherStatus;
  accountNumber?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  userId: number | null;
  createdBy: number | null;
  createdAt?: Date | null;
  User?: {
    username: string;
    email: string;
  };
};

export type CreateTeacherRequest = {
  name: string;
  nip?: string;
  noTelp: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type CreateUserTeacherRequest = {
  name: string;
  username: string;
  email: string;
  noTelp: string;
  password: string;
  nip?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  userId: number;
};

export type UpdateTeacherRequest = {
  id?: number;
  name?: string;
  noTelp?: string;
  status?: TeacherStatus;
  nip?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
};

export type UpdateTeacherStatusRequest = {
  id: number;
  status: TeacherStatus;
};
