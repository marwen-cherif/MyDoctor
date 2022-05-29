export interface AppointmentDto {
  id: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  lastModifiedAt?: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
