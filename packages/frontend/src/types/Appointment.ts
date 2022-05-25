import { parseISO } from 'date-fns';
import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';

export interface AppointmentDto {
  id: string;
  startAt: string;
  endAt: string;
  createdAt: string;
  lastModifiedAt?: string;
}

export interface Appointment {
  id: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  lastModifiedAt?: Date;
}

export const adaptAppointmentDtosToAppointments = (
  appointmentDtos: AppointmentDto[],
): ProcessedEvent[] => {
  return appointmentDtos.map((appointmentDto) => {
    return {
      event_id: appointmentDto.id,
      title: 'test',
      start: parseISO(appointmentDto.startAt),
      end: parseISO(appointmentDto.endAt),
    };
  });
};
