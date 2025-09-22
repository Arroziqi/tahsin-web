export type LevelResponse = {
  id: number;
  level: string;
  isActive?: boolean;
  createdBy: number | null;
};

export type CreateLevelRequest = {
  level: string;
  isActive?: boolean;
};

export type UpdateLevelRequest = {
  id: number;
  level: string;
  isActive?: boolean;
};

export type DeleteLevelRequest = {
  id: number;
};
