import { parseISO } from 'date-fns';
import { ProcessedEvent } from '@aldabil/react-scheduler/dist/types';
import { AppointmentDto } from '@mydoctor/common/dto';

export interface Appointment {
  id: string;
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  lastModifiedAt?: Date;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export const adaptAppointmentDtosToAppointments = (
  appointmentDtos: AppointmentDto[],
): ProcessedEvent[] => {
  return appointmentDtos.map((appointmentDto) => {
    return {
      event_id: appointmentDto.id,
      title: `${appointmentDto.client.lastName} ${appointmentDto.client.firstName}`,
      start: parseISO(appointmentDto.startAt),
      end: parseISO(appointmentDto.endAt),
      email: appointmentDto.client.email,
    };
  });
};
