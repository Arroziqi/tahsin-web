export type EventResponse = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt?: Date;
  createdBy?: number;
};

export type CreateEventRequest = {
  name: string;
  isActive?: boolean;
};

export type UpdateEventRequest = {
  id: number;
  name?: string;
  isActive?: boolean;
};
