export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  token?: string;
  role: Role;
};

export type CreateUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserRequest = {
  username: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
  password: string;
};
